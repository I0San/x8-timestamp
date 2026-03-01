import { jsPDF } from 'jspdf'

interface CertificateData {
  documentHash: string
  owner: string
  timestamp: number
  blockNumber: number
  metadata: string
  transactionHash?: string
}

// X8 Logo as base64 PNG (simplified version for PDF)
const X8_LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAYAAACqNX6+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYjBmOGJlOSwgMjAyMS8xMi8wOC0xOToxMToyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTAxLTE1VDEwOjAwOjAwKzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xNVQxMDowMDowMCswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wMS0xNVQxMDowMDowMCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiBzdEV2dDp3aGVuPSIyMDI0LTAxLTE1VDEwOjAwOjAwKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuMSAoTWFjaW50b3NoKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAZAAyAAAG/8CScEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26OGHIIYo4ogklmjiiSimqOKKLLbo4LYNGBAAOw=='

export function generateCertificatePDF(data: CertificateData): void {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // X8 Design System Colors
  const x8Gold = { r: 197, g: 160, b: 41 }  // #c5a029
  const x8Dark = { r: 35, g: 31, b: 32 }    // #231f20
  
  // Header with gold gradient effect
  doc.setFillColor(x8Gold.r, x8Gold.g, x8Gold.b)
  doc.rect(0, 0, pageWidth, 45, 'F')
  
  // Add subtle darker gold accent bar at the bottom of header
  doc.setFillColor(x8Dark.r, x8Dark.g, x8Dark.b)
  doc.rect(0, 43, pageWidth, 2, 'F')
  
  // Add X8 logo
  try {
    doc.addImage(X8_LOGO_BASE64, 'PNG', 15, 8, 30, 15)
  } catch {
    // Fallback if image fails - logo text will still show via text below
  }
  
  // Header text
  doc.setTextColor(x8Dark.r, x8Dark.g, x8Dark.b)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('X8 AG', pageWidth / 2, 18, { align: 'center' })
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Blockchain Timestamp Certificate', pageWidth / 2, 28, { align: 'center' })
  doc.setFontSize(9)
  doc.text('Immutable Proof of Existence', pageWidth / 2, 36, { align: 'center' })
  
  // Reset text color to dark
  doc.setTextColor(x8Dark.r, x8Dark.g, x8Dark.b)
  
  // Certificate body
  let y = 65
  const leftMargin = 20
  const labelWidth = 50
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(x8Gold.r, x8Gold.g, x8Gold.b)
  doc.text('Certificate Details', leftMargin, y)
  doc.setTextColor(x8Dark.r, x8Dark.g, x8Dark.b)
  y += 15
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  
  const addField = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold')
    doc.text(label + ':', leftMargin, y)
    doc.setFont('helvetica', 'normal')
    
    const lines = doc.splitTextToSize(value, pageWidth - leftMargin - labelWidth - 20)
    doc.text(lines, leftMargin + labelWidth, y)
    y += Math.max(lines.length * 5, 8) + 5
  }
  
  addField('Document Hash', data.documentHash)
  addField('Owner Address', data.owner)
  addField('Timestamp', new Date(data.timestamp * 1000).toISOString())
  addField('Block Number', data.blockNumber.toString())
  
  if (data.metadata) {
    addField('Metadata', data.metadata)
  }
  
  if (data.transactionHash) {
    addField('Transaction Hash', data.transactionHash)
  }
  
  y += 10
  
  // Verification section with gold-tinted background
  doc.setFillColor(250, 248, 243) // Very light gold tint (#faf8f3 from primary-50)
  doc.rect(leftMargin - 5, y, pageWidth - 2 * leftMargin + 10, 40, 'F')
  
  // Gold accent line on top of verification box
  doc.setFillColor(x8Gold.r, x8Gold.g, x8Gold.b)
  doc.rect(leftMargin - 5, y, pageWidth - 2 * leftMargin + 10, 1.5, 'F')
  
  y += 12
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(x8Gold.r, x8Gold.g, x8Gold.b)
  doc.text('Verification', leftMargin, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(x8Dark.r, x8Dark.g, x8Dark.b)
  doc.text('This certificate can be verified on the Ethereum Sepolia blockchain.', leftMargin, y)
  y += 6
  doc.text('Visit: https://sepolia.etherscan.io to verify the transaction.', leftMargin, y)
  
  // Footer with gold accent
  const footerY = doc.internal.pageSize.getHeight() - 25
  
  // Gold line above footer
  doc.setFillColor(x8Gold.r, x8Gold.g, x8Gold.b)
  doc.rect(leftMargin, footerY - 5, pageWidth - 2 * leftMargin, 0.5, 'F')
  
  doc.setFontSize(8)
  doc.setTextColor(107, 114, 128) // x8-gray
  doc.text(`Generated on ${new Date().toISOString()}`, pageWidth / 2, footerY, { align: 'center' })
  doc.setTextColor(x8Gold.r, x8Gold.g, x8Gold.b)
  doc.setFont('helvetica', 'bold')
  doc.text('X8 AG Timestamping Service', pageWidth / 2, footerY + 5, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(107, 114, 128)
  doc.text('www.x8.ag', pageWidth / 2, footerY + 10, { align: 'center' })
  
  // Save
  const filename = data.metadata 
    ? `certificate-${data.metadata.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`
    : `certificate-${data.documentHash.slice(0, 10)}.pdf`
  
  doc.save(filename)
}
