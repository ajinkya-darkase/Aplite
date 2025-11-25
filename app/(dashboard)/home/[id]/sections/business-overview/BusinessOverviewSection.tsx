import { ExternalLink } from 'lucide-react';

export interface Company {
  businessName: string;
  businessType: string;
  address: string;
  founded: string | number;
  ein: string;
  dba: string;
  industry: string;
  state: string;
  employees: string | number;
  website: string;
}

interface BusinessOverviewSectionProps {
  company: Company;
}

export default function BusinessOverviewSection({ company }: BusinessOverviewSectionProps) {
  const formatBusinessType = (type: string) => {
    if (!type) return 'N/A';
    if (type.toLowerCase() === 'llc') return 'LLC';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };
  
  return (
    <div className="p-6 relative min-h-[600px]">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Business Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Business legal name</p>
            <p className="text-gray-900">{company.businessName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Business type</p>
            <p className="text-gray-900">{formatBusinessType(company.businessType)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Address</p>
            <p className="text-gray-900">{company.address || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Founded</p>
            <p className="text-gray-900">{company.founded || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Employer identification number (EIN)</p>
            <p className="text-gray-900">{company.ein || 'N/A'}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Doing business as (DBA)</p>
            <p className="text-gray-900">{company.dba || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Industry</p>
            <p className="text-gray-900">{company.industry ? company.industry.charAt(0).toUpperCase() + company.industry.slice(1).toLowerCase() : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">State of formation</p>
            <p className="text-gray-900">{company.state || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Employees</p>
            <p className="text-gray-900">{company.employees || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Website</p>
            {company.website && company.website !== 'N/A' ? (
              <a
                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                {company.website} <ExternalLink size={14} className="text-gray-400" />
              </a>
            ) : (
              <p className="text-gray-900">N/A</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}