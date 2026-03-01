About
X8 AG is planning to update and then upgrade its User Portal. The purpose of this update is to add functions to the X8 Global Stablecoin System, some of which are required due to compliance and regulatory changes. Additionally, X8 AG will add elements to increase the commercialization potential and the overall attractiveness of the system. This document focuses on Timestamping service.

Summary
Timestamping will enable that user timestamps documents by which values of those documents are immutably stored on DLT.

Timestamping Entry (form)
Timestamping Entry shall include the following choices for the user to select:
•	Document upload
o	For any format. 
	System shall enable various supported document formats.
•	Documents like pdf, pictures like jpg and others, audio like mp3 and others, video, other formats.
•	Storage selection
o	User’s device
	This selection means that the document itself is not stored on blockchain. The document remains kept on user’s device. 
	Loss of the document from user’s devices means there is no backup copy in the System.
o	Blockchain – IPFS
	This selection means that the document itself is stored on blockchain. The user can access the document from blockchain at any later point.
	Backup of the document therefore remains on blockchain even if user loses, deletes or changes the document on his own device.
	Blockchain – IPFS option enables that use delegates access to the document if he or she wishes to.
•	This choice will be available separately after the user successfully completes the timestamping.
•	Price
o	The user can select the following price options, which result in the timestamping either on Bitcoin (Elite pricing option) or on a less expensive alternative blockchain network (Budget pricing option).
	Budget
	Elite
•	Pay from Wallet (payment selection)
o	The user can select from which of his wallets he or she will pay for the timestamping. Funds must exist on wallets, which the user can select from. Menu of wallets also shows a summary of available funds on that wallet.
o	Selection menu:
	Wallet 1 and Name, Avatar; Currency
	Wallet 2 and Name, Avatar; Currency
	Wallet 3 and Name, Avatar; Currency
	Etc…
•	Schedule
o	These options enable the user to either timestamp immediately, or to schedule the timestamping for a specific time.
	Now
	Later (schedule timestamping)
•	If this option is selected, the calendar date and time appear and must be determined by the user.
•	Timestamp (button)
o	“Timestamp” button enables the user to start the process after input data was entered, and the button was clicked by the user.
o	Button activates once all input data was provided by the user.
•	Summary Form and Confirm button
o	After the Timestamp button click, the “Timestamping Summary” form appears, which lists the available information to the user. The user must confirm the choice by clicking the “Confirm” button at the bottom of the form.
o	“Confirm” – button.

Timestamping Activity (list)
History activity list shows all timestamping entries and their status.

User can filter the list by:
•	Storage selection
o	User
o	IPFS
•	Price selection (blockchain)
o	Budget blockchain
o	Elite blockchain
•	Avatar (Wallet) and Currency (secondary filter option linked to Avatar/Wallet)
o	Avatar/Wallet
o	Currency
•	Time
o	Newest first
o	Oldest first
•	Status
o	Completed
o	Pending


Certificate (output document)

Certificate is a document, which is produced by X8 AG at the end of the successful timestamping process. This certificate will be delivered to the client as proof of successfully completed timestamping.

On this certificate the main information about the timestamping will be shown.
•	Blockchain Certificate Number
•	Project data
o	Project ID
o	Project Title
o	Submitted by
o	Content
o	Fingerprint
•	Blockchain transaction data
o	Transaction ID
o	Confirmation Date
o	Block
o	Multisig Output
o	OP_RETURN
o	Data Key
o	Owner Key
o	X8 Key
•	Logos


Validator

Validator enables validation of documents, which already went through timestamping successfully. For this the source documents and the data from certificate (output document) are needed

Validator provides two main functions:
•	View of data recorded under the *Blockchain Certificate Number
•	Confirmation of valid link between a Document and the Blockchain Certificate Number

View od data:

1.	User can enter Blockchain Certificate Number into the main field. Form consists of: 
a.	Text Title: “Validate a blockchain certificate”
b.	Text Description: “Prove ownership and existence of your data related to a X8 Blockchain certificate”
c.	Text accompanying the entry field: “Enter your certificate ID”
d.	Field: this field accepts certificate ID
e.	Button
i.	“Button text”: Verify this certificate


Confirmation of valid link:

2.	When user enters the certificate ID, a new separate form opens with the following elements:
a.	X8 certificate data
i.	Certificate ID (existing data displayed)
ii.	Certificate type (existing data displayed)
iii.	Submitted by (existing data displayed)
iv.	Registration date (existing data displayed)
b.	Bitcoin transaction information
i.	Transaction ID (existing data displayed)
ii.	OP_RETURN (existing data displayed)
iii.	Status (existing data displayed)
iv.	Organization Public Key (existing data displayed)
v.	Project Data Public Key (existing data displayed)
vi.	X8 Public Key (existing data displayed)
c.	Drag and drop field to paste files (for validation of the existing document)
i.	Documents upload field
ii.	This is multi-file upload **
1.	More than one file needs to be uploaded:
a.	Certificate
b.	Attachments
c.	Cover
d.	Owner Private Key (text entry field)
e.	Data Private Key (text entry field)
f.	X8 Private Key (text entry field)


*Comment 1: If the user chose an Elite price option when timestamping a document, then the certificate produced is on Bitcoin network. Alternatively, if the user chose a Budget price option when timestamping a document, then the certificate is produced on another less expensive blockchain network. The wording in the user portal should reflect this.


**Comment 2: Multi-file upload field process adheres to requirements for the resolution of proof of ownership, and with minimization of risk exposure for the client when entering source documents (plural). The input does not necessarily require the upload of the main original source document and can use other documents resulting from timestamping to confirm the ownership.

