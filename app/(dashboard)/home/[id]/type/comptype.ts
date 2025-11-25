export interface Company {
  id: string;
  businessName: string;
  einNumber: string;
  businessAddress: string;
  contactName: string;
  contactEmail: string;
  pin: string;
  // Additional details for company page
  name: string;
  type: string;
  website: string;
  businessType: string;
  address: string;
  founded: string;
  ein: string;
  dba: string;
  industry: string;
  state: string;
  employees: string;
  bankDetails: {
    beneficiaryName: string;
    wireRoutingNumber: string;
    swiftCode: string;
    bankAddress: string;
    abaRoutingNumber: string;
    bankName: string;
    accountNumber: string;
  };
  paymentInstructions: {
    ach: string[];
    wire: string[];
  };
  contactInfo: {
    contactName: string;
    workEmail: string;
    contactTitle: string;
    phoneNumber: string;
  };
}