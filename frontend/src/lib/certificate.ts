import { jsPDF } from 'jspdf'

interface CertificateData {
  documentHash: string
  owner: string
  timestamp: number
  blockNumber: number
  metadata: string
  transactionHash?: string
}

export function generateCertificatePDF(data: CertificateData): void {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFillColor(37, 99, 235)
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('X8 AG', pageWidth / 2, 20, { align: 'center' })
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Blockchain Timestamp Certificate', pageWidth / 2, 30, { align: 'center' })
  
  // Reset text color
  doc.setTextColor(0, 0, 0)
  
  // Certificate body
  let y = 60
  const leftMargin = 20
  const labelWidth = 50
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Certificate Details', leftMargin, y)
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
  
  // Verification section
  doc.setFillColor(240, 240, 240)
  doc.rect(leftMargin - 5, y, pageWidth - 2 * leftMargin + 10, 35, 'F')
  
  y += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Verification', leftMargin, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('This certificate can be verified on the Ethereum Sepolia blockchain.', leftMargin, y)
  y += 6
  doc.text('Visit: https://sepolia.etherscan.io to verify the transaction.', leftMargin, y)
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text(`Generated on ${new Date().toISOString()}`, pageWidth / 2, footerY, { align: 'center' })
  doc.text('X8 AG Timestamping Service', pageWidth / 2, footerY + 5, { align: 'center' })
  
  // Save
  const filename = data.metadata 
    ? `certificate-${data.metadata.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`
    : `certificate-${data.documentHash.slice(0, 10)}.pdf`
  
  doc.save(filename)
}
