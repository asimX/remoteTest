exports.GV = {
	
	// proposal ID created by ACS
	ProposalId: 0,
	
	Notes : '',
	
	/////////// Proposed Pricing
	ProcessingFee : 0,
	AuthFee : 0,
	PinDebitProcessingFee : 0,
	PinDebitAuthFee : 0,
	MonthlyServiceFee : 0,
	IndustryComplinceFee : 0,
	TerminalFee : 0,
	MXGatewayFee : 0,
	DebitAccessFee : 0,

	//Current Scenerio
	debitVol : 0,
	aeVol : 0,
	dsVol : 0,
	mcVol : 0,
	visaVol : 0,
	debitTransactions : 0,
	aeTransactions : 0,
	dsTransactions : 0,
	mcTransactions : 0,
	visaTransactions : 0,
	debitAverageTicket : 0,
	aeAverageTicket : 0,
	dsAverageTicket : 0,
	mcAverageTicket : 0,
	visaAverageTicket : 0,
	TotalCurrentFees : 0,
	CurrentEffectiveRate : 0,

	//////Interchange Analysis View

	debitInterchangeFees : 0,
	aeInterchangeFees : 0,
	dsInterchangeFees : 0,
	mcInterchangeFees : 0,
	visaInterchangeFees : 0,
	debitProcessingFees : 0,
	aeProcessingFees : 0,
	dsProcessingFees : 0,
	mcProcessingFees : 0,
	visaProcessingFees : 0,
	debitCardFees : 0,
	aeCardFees : 0,
	dsCardFees : 0,
	mcCardFees : 0,
	visaCardFees : 0,
	TotalNewFees : 0,
	//TotalNewField : 0,
	NewEffectiveRate : 0,
	tfInterFeeChange: false,

	////Proposal for company
	// TotalCurrentFee2 : 0,
	// ProposedFee : 0,
	// CurrentEffectiveRates : 0,
	// ProposedEffectiveRate : 0,
	MonthlySavings : 0,
	Year1Savings : 0,
	Year2Savings : 0,
	Year3Savings : 0,
	Year4Savings : 0,

	////////////////////// Information View

	BusinessType : '',
	BusinessName : '',
	StreetAddress : '',
	State : '',
	City : '',
	Zip : '',
	Contact : '',
	Phone : '',
	ProcessingMonths : '',
	ProposalStatus: null,

    //////////charge rates//////////////
	
	VisaRate: 0,
	McRate: 0,
	DsRate: 0,
	AmexRate: 0,
	AmexTrRate: 0,
	DebitRate: 0,
	
	
	// //////////////////////////Debit
// 
	// RetailLowDb : 0.00795,
	// RetailHighDb : 0.00596,
	// RestaurantLowDb : 0.0200,
	// RestaurantHighDb : 0.0175,
	// SmallTicketDb : 0.02001,
	// MOTODb : 0.01965,
	// InternetDb : 0.01965,
	// BusinessToBusinessDb : 0.00434,
	// SupermarketDb : 0.0120,
	// HotelLodgingDb : 0.00,
	// UtilitiesDb : 0.0102,
	// /////////////////////////////Discover
// 
	// RetailLowDis : .01671,
	// RetailHighDis : .01554,
	// RestaurantLowDis : .01964,
	// RestaurantHighDis : .01642,
	// SmallTicketDis : .01546,
	// MOTODis : .01444,
	// InternetDis : .01444,
	// BusinessToBusinessDis : .01666,
	// SupermarketDis : .0206,
	// HotelLodgingDis : .0219,
	// UtilitiesDis : .0079,
// 
	// ////////////////////////////////Master card
// 
	// RetailLowMcard : .01808,
	// RetailHighMcard : .01676,
	// RestaurantLowMcard : .01995,
	// RestaurantHighMcard : .01738,
	// SmallTicketMcard : .02578,
	// MOTOMcard : .01887,
	// InternetMcard : .01887,
	// BusinessToBusinessMcard : .01868,
	// SupermarketMcard : .0154,
	// HotelLodgingMcard : .0211,
	// UtilitiesMcard : .0046,
	// //////////////////////////////Visa
	// RetailLowVsa : .01724,
	// RetailHighVsa : .01578,
	// RestaurantLowVsa : .01995,
	// RestaurantHighVsa : .01758,
	// SmallTicketVsa : .02267,
	// MOTOVsa : .0204,
	// InternetVsa : .0204,
	// BusinessToBusinessVsa : .01909,
	// SupermarketVsa : .0156,
	// HotelLodgingVsa : .0181,
	// UtilitiesVsa : .0138,
// 
	// //////////////////////////////amex
// 
	// RetailLowAmex : 0.0289,
	// RetailHighAmex : 0.0289,
	// RestaurantLowAmex : 0.0289,
	// RestaurantHighAmex : 0.0289,
	// SmallTicketAmex : 0.035,
	// MOTOAmex : 0.035,
	// InternetAmex : 0.035,
	// BusinessToBusinessAmex : 0.0289,
	// SupermarketAmex : 0.023,
	// HotelLodgingAmex : 0.035,
	// UtilitiesAmex : 0.0289,
	////
	ReferralPartners: {
		
		'00':
		{
			title: 'None',
			rownum: null
		}
	},
	rpID: null,
	sm_id: null,
	tm_id: null,
	acl_id: null,
	
	// used to index proposals in DB prior to ACS upload
	//timeId: null,
	
	////////Cloud variables
	sessionId : null,
	loggedIn : false,

	////////User info
	userId : null,
	firstName : null,
	lastName : null,
	userRole : null,
	repName: null,
	team_id: null,
	team_name: null,
	addressLine1: null,
	companyName: null,
	addressLine2: null,
	phone: null,
	website: null,
	email: null,
	
	firstTimeLogin: null,	//used to determine whether library must be downloaded after first time login when there is 0 items in DB for new user. Using this to avoid extra processing call to DB.

	///////App Navigation
	navGroup : null,
	homeScreen : null,
	loginScreen : null,
	requestedUpdate : false,
	
	/////// APP STATE VARIABLES
	proposalsViewFirstTime:false,
	libraryViewFirstTime:false,
	LastUpdated : null,
	DateCreated: null,
	cloudSessionSet: false,
	currentLocalId: null,
	localFileIds: null,      // this array is loaded into memory when the library comes to view and release when the library view is hidden or closed.
	lastFileSyncDate: null,
	lastProposalSyncDate: null,
	//AppResumed:false,
	
	/////// LOADING SCREENS
	homeloading: null,
	
	ResetValues: function(){
		this.ProposalId=0;
		this.Notes = '';
		/////////// Proposed Pricing
		this.ProcessingFee = 0;
		this.AuthFee = 0;
		this.PinDebitProcessingFee = 0;
		this.PinDebitAuthFee = 0;
		this.MonthlyServiceFee = 0;
		this.IndustryComplinceFee = 0;
		this.TerminalFee = 0;
		this.MXGatewayFee = 0;
		this.DebitAccessFee = 0;

		//Current Scenerio
		this.debitVol = 0;
		this.aeVol = 0;
		this.dsVol = 0;
		this.mcVol = 0;
		this.visaVol = 0;
		this.debitTransactions = 0;
		this.aeTransactions = 0;
		this.dsTransactions = 0;
		this.mcTransactions = 0;
		this.visaTransactions = 0;
		this.debitAverageTicket = 0;
		this.aeAverageTicket = 0;
		this.dsAverageTicket = 0;
		this.mcAverageTicket = 0;
		this.visaAverageTicket = 0;
		this.TotalCurrentFees = 0;
		this.CurrentEffectiveRate = 0;

		//////Interchange Analysis View

		this.debitInterchangeFees = 0;
		this.aeInterchangeFees = 0;
		this.dsInterchangeFees = 0;
		this.mcInterchangeFees = 0;
		this.visaInterchangeFees = 0;
		this.debitProcessingFees = 0;
		this.aeProcessingFees = 0;
		this.dsProcessingFees = 0;
		this.mcProcessingFees = 0;
		this.visaProcessingFees = 0;
		this.debitCardFees = 0;
		this.aeCardFees = 0;
		this.dsCardFees = 0;
		this.mcCardFees = 0;
		this.visaCardFees = 0;
		this.TotalNewFees = 0;
		//TotalNewField : 0;
		this.NewEffectiveRate = 0;
		this.tfInterFeeChange = false;
		
		this.MonthlySavings = 0;
		this.Year1Savings = 0;
		this.Year2Savings = 0;
		this.Year3Savings = 0;
		this.Year4Savings = 0;
		
		this.BusinessType = '';
		this.BusinessName = '';
		this.StreetAddress = '';
		this.State = '';
		this.City = '';
		this.Zip = '';
		this.Contact = '';
		this.Phone = '';
		this.ProcessingMonths = '';
		//this.timeId= null;
		this.requestedUpdate = false;
		this.LastUpdated = null;
		this.Date= null;
		this.currentLocalId=null;
		this.rpID=null;
		
	},
	
	// SetRates: function(dataArray){
		// if(dataArray.length>0){
			// for(var i=0;i<dataArray.length;i++){
				// var name = dataArray[i].typeName;
				// if(name=="Retail High")
				// {
					// this.RetailHighVsa = dataArray[i].visaRate;
					// this.RetailHighMcard = dataArray[i].mcRate;
					// this.RetailHighDis = dataArray[i].dsRate;
					// this.RetailHighAmex = dataArray[i].amexRate;
					// this.RetailHighDb = dataArray[i].debitRate;
				// }
				// else if(name=="Retail Low")
				// {
					// this.RetailLowVsa = dataArray[i].visaRate;
					// this.RetailLowMcard = dataArray[i].mcRate;
					// this.RetailLowDis = dataArray[i].dsRate;
					// this.RetailLowAmex = dataArray[i].amexRate;
					// this.RetailLowDb = dataArray[i].debitRate;
				// }
				// else if(name=="Restaurant High")
				// {
					// this.RestaurantHighVsa = dataArray[i].visaRate;
					// this.RestaurantHighMcard = dataArray[i].mcRate;
					// this.RestaurantHighDis = dataArray[i].dsRate;
					// this.RestaurantHighAmex = dataArray[i].amexRate;
					// this.RestaurantHighDb = dataArray[i].debitRate;
				// }
				// else if(name=="Restaurant Low")
				// {
					// this.RestaurantLowVsa = dataArray[i].visaRate;
					// this.RestaurantLowMcard = dataArray[i].mcRate;
					// this.RestaurantLowDis = dataArray[i].dsRate;
					// this.RestaurantLowAmex = dataArray[i].amexRate;
					// this.RestaurantLowDb = dataArray[i].debitRate;
				// }
				// else if(name=="Utilities")
				// {
					// this.UtilitiesVsa = dataArray[i].visaRate;
					// this.UtilitiesMcard = dataArray[i].mcRate;
					// this.UtilitiesDis = dataArray[i].dsRate;
					// this.UtilitiesAmex = dataArray[i].amexRate;
					// this.UtilitiesDb = dataArray[i].debitRate;
				// }
				// else if(name=="Hotel/Lodging")
				// {
					// this.HotelLodgingVsa = dataArray[i].visaRate;
					// this.HotelLodgingMcard = dataArray[i].mcRate;
					// this.HotelLodgingDis = dataArray[i].dsRate;
					// this.HotelLodgingAmex = dataArray[i].amexRate;
					// this.HotelLodgingDb = dataArray[i].debitRate;
				// }
				// else if(name=="Supermarket")
				// {
					// this.SupermarketVsa = dataArray[i].visaRate;
					// this.SupermarketMcard = dataArray[i].mcRate;
					// this.SupermarketDis = dataArray[i].dsRate;
					// this.SupermarketAmex = dataArray[i].amexRate;
					// this.SupermarketDb = dataArray[i].debitRate;
				// }
				// else if(name=="Business to Business")
				// {
					// this.BusinessToBusinessVsa = dataArray[i].visaRate;
					// this.BusinessToBusinessMcard = dataArray[i].mcRate;
					// this.BusinessToBusinessDis = dataArray[i].dsRate;
					// this.BusinessToBusinessAmex = dataArray[i].dsRate;
					// this.BusinessToBusinessDb = dataArray[i].debitRate;
				// }
				// else if (name=="Internet"){
					// this.InternetVsa = dataArray[i].visaRate;
					// this.InternetMcard = dataArray[i].mcRate;
					// this.InternetDis = dataArray[i].dsRate;
					// this.InternetAmex = dataArray[i].amexRate;
					// this.InternetDb = dataArray[i].debitRate;
				// }
				// else if(name=="MOTO"){
					// this.MOTOVsa = dataArray[i].visaRate;
					// this.MOTOMcard = dataArray[i].mcRate;
					// this.MOTODis = dataArray[i].dsRate;
					// this.MOTOAmex = dataArray[i].amexRate;
					// this.MOTODb = dataArray[i].debitRate;
				// }
				// else if(name=="Small Ticket")
				// {
					// this.SmallTicketVsa = dataArray[i].visaRate;
					// this.SmallTicketMcard = dataArray[i].mcRate;
					// this.SmallTicketDis = dataArray[i].dsRate;
					// this.SmallTicketAmex = dataArray[i].amexRate;
					// this.SmallTicketDb = dataArray[i].debitRate;
				// }
			// }
		// }
	// }
};

