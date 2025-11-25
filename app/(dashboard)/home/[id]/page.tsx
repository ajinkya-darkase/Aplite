"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, Activity } from "react";
import InlineNavigation from "@/components/ui/InlineButtons";
import BusinessOverviewSection from "./sections/business-overview/BusinessOverviewSection";
import BankDetailsSection from "./sections/bank-details/BankDetailsSection";
import PaymentInstructionsSection from "./sections/payment-instructions/PaymentInstructionsSection";
import ContactInfoSection from "./sections/contact-info/ContactInfoSection";
import PinModal from "./components/PinModal";
import { apiClient } from "@/lib/api";
import { useSearchStore } from "@/lib/store/searchStore";
import {
  ClipboardCheck,
  BanknoteIcon,
  FileText,
  Mail,
  ArrowLeft,
} from "lucide-react";
import BlankCard from "@/components/ui/BlankCard";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
type TabType = "overview" | "bank_details" | "payment_instructions";
// | "contact_info";

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params.id as string;
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(companyId ? "/home" : "/login");
    }
  }, [isAuthenticated, companyId, router]);

  const formatBusinessType = (type: string) => {
    if (!type) return "";
    if (type.toLowerCase() === "llc") return "LLC";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState<any>(null);
  const [paymentInstructions, setPaymentInstructions] = useState<any>(null);
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);

  const { searchResults } = useSearchStore();

  // Get company data from search results or use mock data
  const searchResult = searchResults.find(
    (result) => result.applicationId.toString() === companyId
  );
  const company = {
    id: companyId,
    name: searchResult?.legalName,
    businessName: searchResult?.legalName,
    einNumber: searchResult?.ein,
    businessAddress: searchResult?.formationState
      ? `Formed in ${searchResult?.formationState}`
      : "N/A",
    contactName: "N/A",
    contactEmail: "",
    pin: "",
    formationState: searchResult?.formationState,
    formationDate: searchResult?.formationDate,
    dbaName: "",
    businessType: "",
    industry: "",
    numberOfEmployees: "",
    websiteUrl: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    businessDescription: "",
  };

  const fetchRealData = useCallback(async () => {
    setIsLoadingCompany(true);
    try {
      if (searchResult?.userId) {
        const [businessInfo, paymentInstructionsData] = await Promise.all([
          apiClient.getBusinessInfoByUserId(searchResult?.userId.toString()),
          apiClient.getPaymentInstructions(searchResult?.userId.toString()),
          // apiClient.getContactInfo(searchResult?.userId.toString())
        ]);
        setCompanyData(businessInfo);
        setPaymentInstructions(paymentInstructionsData);
      }
    } catch (error) {
      console.error("Error fetching business data:", error);
    } finally {
      setIsLoadingCompany(false);
    }
  }, [searchResult]);

  useEffect(() => {
    if (searchResult) {
      fetchRealData();
    }
  }, [fetchRealData, searchResult]);

  if (!company) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Company Not Found
          </h1>
          <p className="text-gray-600">
            The requested company could not be found.
          </p>
        </div>
      </div>
    );
  }

  const displayCompany = {
    id: companyId,
    name:
      companyData?.data?.business?.legalName ||
      company?.name ||
      "Company Details",
    businessName:
      companyData?.data?.business?.legalName ||
      company?.businessName ||
      "Company Details",
    businessAddress: companyData?.data?.address
      ? `${companyData.data.address.line1}${
          companyData.data.address.line2
            ? ", " + companyData.data.address.line2
            : ""
        }, ${companyData.data.address.city}, ${companyData.data.address.state}`
      : company?.businessAddress || "N/A",
    address: companyData?.data?.address
      ? `${companyData.data.address.line1}${
          companyData.data.address.line2
            ? ", " + companyData.data.address.line2
            : ""
        }, ${companyData.data.address.city}, ${companyData.data.address.state}`
      : company?.businessAddress || "N/A",
    type:
      companyData?.data?.business?.businessType ||
      company?.businessType ||
      "Business",
    businessType:
      companyData?.data?.business?.businessType ||
      company?.businessType ||
      "Business",
    website: companyData?.data?.business?.websiteUrl || "N/A",
    einNumber: companyData?.data?.business?.ein || company?.einNumber || "",
    ein: companyData?.data?.business?.ein || company?.einNumber || "",
    pin: company?.pin || "",
    contactName: "N/A",
    contactEmail: company?.contactEmail || "N/A",
    contactInfo: {
      contactName: "N/A",
      workEmail: "N/A",
      contactTitle: "",
      phoneNumber: "",
    },
    industry: companyData?.data?.business?.industry || "N/A",
    employees: companyData?.data?.business?.numberOfEmployees || "N/A",
    founded:
      companyData?.data?.address?.formationDate ||
      company?.formationDate ||
      "N/A",
    state:
      companyData?.data?.address?.formationState ||
      company?.formationState ||
      "N/A",
    dba: companyData?.data?.business?.dbaName || "N/A",
    businessDescription:
      companyData?.data?.address?.businessDescription || "N/A",
    zip: companyData?.data?.address?.zip || "N/A",
    country: companyData?.data?.address?.country || "N/A",
    paymentInstructions: null,
  };

  const tabButtons = [
    {
      label: (
        <div className="flex items-center gap-2">
          <ClipboardCheck size={18} />
          Business Overview
        </div>
      ),
      value: "overview" as TabType,
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <BanknoteIcon size={18} />
          Bank details
        </div>
      ),
      value: "bank_details" as TabType,
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <FileText size={18} />
          Payment Instructions
        </div>
      ),
      value: "payment_instructions" as TabType,
    },
    // {
    //   label: (
    //     <div className="flex items-center gap-2">
    //       <Mail size={18} />
    //       Contact Info
    //     </div>
    //   ),
    //   value: "contact_info" as TabType,
    // },
  ];

  return (
    <div className="space-y-10">
      <BlankCard>
        <div className="p-8">
          <div className="mb-6">
            <button
              onClick={() => router.push("/home")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Search
            </button>
          </div>
          <div className="mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {company.name}
              </h1>
              <p className="text-gray-600">
                {formatBusinessType(displayCompany.type)} •{" "}
                {displayCompany.website}
              </p>
            </div>
          </div>
          <InlineNavigation
            onChange={setActiveTab}
            buttons={tabButtons}
            containerClass="bg-white shadow gap-0 w-full flex rounded-lg"
            activeButtonClass="text-[#46568F] border-b-2 border-[#46568F] flex-1 px-6 py-2 first:pl-8"
            inactiveButtonClass="text-gray-500 border-none flex-1 px-6 py-4 first:pl-8"
          />
          <div className="bg-white">
            {isLoadingCompany ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading details...</span>
              </div>
            ) : (
              <>
                <Activity
                  mode={activeTab === "overview" ? "visible" : "hidden"}
                >
                  <BusinessOverviewSection company={displayCompany} />
                </Activity>

                <Activity
                  mode={activeTab === "bank_details" ? "visible" : "hidden"}
                >
                  <BankDetailsSection />
                </Activity>

                <Activity
                  mode={
                    activeTab === "payment_instructions" ? "visible" : "hidden"
                  }
                >
                  <PaymentInstructionsSection
                    text={paymentInstructions?.paymentInstruction}
                  />
                </Activity>

                {/* <Activity
                  mode={activeTab === "contact_info" ? "visible" : "hidden"}
                >
                  <ContactInfoSection
                    contact={displayCompany.contactInfo}
                  />
                </Activity> */}
              </>
            )}
          </div>

          <PinModal
            isOpen={isPinModalOpen}
            onClose={() => setIsPinModalOpen(false)}
            onSubmit={() => {
              setIsPinModalOpen(false);
            }}
          />
        </div>
      </BlankCard>
    </div>
  );
}
