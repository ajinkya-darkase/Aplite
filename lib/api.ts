
import sharedApiClient from "@/lib/shared/axios.config";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      try {
        const { useAuthStore } = require("@/lib/store/authStore");
        const { accessToken } = useAuthStore.getState();
        if (accessToken) return accessToken;
      } catch (error) {
        // Fallback to localStorage
      }
      return localStorage.getItem("access_token");
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getAuthToken();

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }

  // private async request<T>(endpoint: string, options: any = {}): Promise<T> {
  //   try {
  //     const response = await sharedApiClient({
  //       url: endpoint,
  //       method: options.method || 'get',
  //       data: options.body ? JSON.parse(options.body) : undefined,
  //       params: options.params,
  //       headers: options.headers,
  //     });
  //     return response.data;
  //   } catch (error: any) {
  //     // Axios error handling
  //     let errorMessage = 'Unknown error';
  //     let status = 500;
  //     if (error.response) {
  //       errorMessage = error.response.data?.message || error.message;
  //       status = error.response.status;
  //     } else if (error.request) {
  //       errorMessage = 'No response received from server';
  //     } else {
  //       errorMessage = error.message;
  //     }
  //     const errorObj = new Error(errorMessage) as any;
  //     errorObj.status = status;
  //     errorObj.raw = error.response?.data;
  //     throw errorObj;
  //   }
  // }

  async searchBusiness(query: string): Promise<any[]> {
    const token = this.getAuthToken();
    if (!token) throw new Error("No auth token");

    const headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    const searchUrl = `/web/business/search`;

    if (query.match(/^A[A-Z]\d{4}$/)) {
      const response = await sharedApiClient.get(searchUrl, {
        headers,
        params: { userPin: query },
      });
      return response.data.data || [];
    }

    const [dbaResponse, legalResponse] = await Promise.allSettled([
      sharedApiClient.get(searchUrl, { headers, params: { dbaName: query } }),
      sharedApiClient.get(searchUrl, { headers, params: { legalName: query } }),
    ]);

    const results: any[] = [];

    if (dbaResponse.status === "fulfilled") {
      results.push(...(dbaResponse.value.data.data || []));
    }
    if (legalResponse.status === "fulfilled") {
      results.push(...(legalResponse.value.data.data || []));
    }

    const finalResults = results.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.applicationId === item.applicationId)
    );
    return finalResults;
  }

  async getBusinessInfoByUserId(userId: string): Promise<any> {
    const result = await this.request(`/addresses/businessinfo/${userId}`);
    return result;
  }

  async getBankingDetailsByUserId(userPin: string): Promise<any> {
    return this.request(`/web/banking/by-pin?userPin=${encodeURIComponent(userPin)}`);
  }

  async getPaymentInstructions(userId: string): Promise<any> {
    return this.request(`/vendor-connections/payment-instruction/${userId}`);
  }

  async getContactInfo(userId: string): Promise<any> {
    return this.request(`/vendor/contact/${userId}`);
  }
}

export const apiClient = new ApiClient();

// Legacy export for backward compatibility
export const searchBusiness = (query: string) => {
  return apiClient.searchBusiness(query);
};
