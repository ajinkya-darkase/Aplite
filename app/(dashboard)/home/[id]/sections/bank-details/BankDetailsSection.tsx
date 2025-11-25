import Button from "@/components/ui/Buttons";
import { Lock } from "lucide-react";
import { useState } from "react";
import PinModal from "../../components/PinModal";
import LimitReachedModal from "@/components/modal/LimitReachedModal";
export default function BankDetailsSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [bankingData, setBankingData] = useState<any>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLimit, setIsLimit] = useState<boolean>(false);
  const handlePinSubmit = async (pin: string) => {
    setIsLoading(true);
    setIsPinModalOpen(false);
    try {
      // Get token
      //
      let token: string | null = null;
      if (typeof window !== "undefined") {
        try {
          const { useAuthStore } = require("@/lib/store/authStore");
          token = useAuthStore.getState().accessToken;
        } catch (_) {}
        if (!token) {
          token = localStorage.getItem("access_token");
        }
      }
      const url = `${
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
      }/web/banking/by-pin?userPin=${encodeURIComponent(pin)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }); // If limit exceeded / unauthorized
      //
      if (response.status === 401 || response.status === 403) {
        setIsLimit(true);
        return;
      }
      if (!response.ok) {
        setIsLimit(true);
        return;
      } // Success
      //
      const data = await response.json();
      setBankingData(data);
      setIsUnlocked(true);
    } catch (err) {
      console.error("Fetch error:", err);
      setIsLimit(true);
    } finally {
      setIsLoading(false);
    }
  }; // 🔒 LOCKED UI
  //
  if (!isUnlocked) {
    return (
      <>
        {" "}
        <div className="p-6 flex flex-col items-center justify-center min-h-[600px]">
          {" "}
          <div className="flex flex-col items-center text-center max-w-md">
            {" "}
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              {" "}
              <Lock size={24} className="text-gray-400" />{" "}
            </div>{" "}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {" "}
              Protected Content{" "}
            </h3>{" "}
            <p className="text-gray-600 mb-6">
              {" "}
              Bank details are protected. Enter the business PIN to view this
              information.{" "}
            </p>{" "}
            <Button
              variant="primary"
              size="md"
              label={isLoading ? "Loading..." : "Enter PIN to View"}
              onClick={() => setIsPinModalOpen(true)}
              className="mb-4"
            />{" "}
            <p className="text-sm text-gray-500">
              {" "}
              Request the PIN from the business or use the connection flow to
              get access.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* PIN */}{" "}
        <PinModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onSubmit={handlePinSubmit}
        />{" "}
        {/* 🔥 LIMIT REACHED MODAL ALWAYS RENDER */}{" "}
        <LimitReachedModal isOpen={isLimit} onClose={() => setIsLimit(false)} />{" "}
      </>
    );
  } // 🔓 UNLOCKED UI
  //
  return (
    <>
      {" "}
      <div className="p-6 relative min-h-[600px]">
        {" "}
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {" "}
          Bank Details{" "}
        </h2>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          {" "}
          <div className="space-y-6">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-600 mb-2">
                {" "}
                Beneficiary Name{" "}
              </p>{" "}
              <p className="text-gray-900 font-medium">
                {" "}
                {bankingData?.accountName || "N/A"}{" "}
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-600 mb-2">
                {" "}
                Wire Routing Number{" "}
              </p>{" "}
              <p className="text-gray-900 font-mono">
                {" "}
                {bankingData?.wireRoutingNumber || "N/A"}{" "}
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-600 mb-2">
                {" "}
                SWIFT/BIC Code{" "}
              </p>{" "}
              <p className="text-gray-900 font-mono">
                {" "}
                {bankingData?.swiftBicCode || "N/A"}{" "}
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-600 mb-2">
                {" "}
                Bank Address{" "}
              </p>{" "}
              <p className="text-gray-900">
                {" "}
                {bankingData?.bankAddress || "N/A"}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="space-y-6">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-600 mb-2">
                {" "}
                ABA Routing Number{" "}
              </p>{" "}
              <p className="text-gray-900 font-mono">
                {" "}
                {bankingData?.achRoutingNumber || "N/A"}{" "}
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-600 mb-2">
                {" "}
                Bank Name{" "}
              </p>{" "}
              <p className="text-gray-900 font-medium">
                {" "}
                {bankingData?.bankName || "N/A"}{" "}
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-600 mb-2">
                {" "}
                Account Number{" "}
              </p>{" "}
              <p className="text-gray-900 font-mono">
                {" "}
                {bankingData?.accountNumber || "N/A"}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* 🔥 LIMIT REACHED MODAL (also here) */}{" "}
      <LimitReachedModal isOpen={isLimit} onClose={() => setIsLimit(false)} />{" "}
    </>
  );
}
