
interface ContactInfoSectionProps {
  contact: contactInfo;
}

interface contactInfo{
  contactName: string;
  workEmail: string;
  contactTitle: string;
  phoneNumber: string;

}

export default function ContactInfoSection({ contact }: ContactInfoSectionProps) {
  return (
    <div className="p-6 relative min-h-[600px]">
      <h2 className="text-lg text-gray-900 mb-6">
        Contact Info
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Contact Name</p>
            <p className="text-gray-900">{contact.contactName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Work Email</p>
            <p className="text-gray-900">{contact.workEmail}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Contact Title</p>
            <p className="text-gray-900">{contact.contactTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone Number</p>
            <p className="text-gray-900">{contact.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}