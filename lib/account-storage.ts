export type StoredAccount = {
  name: string;
  email: string;
  birthDate: string;
  address: string;
  zip: string;
};

export const ACCOUNT_STORAGE_KEY = "sams-account";
export const ACCOUNT_UPDATED_EVENT = "sams-account-updated";

export function getStoredAccount(): StoredAccount | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawAccount = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);

  if (!rawAccount) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawAccount) as Partial<StoredAccount>;

    if (!parsed.name || !parsed.email || !parsed.address || !parsed.zip) {
      return null;
    }

    return {
      name: parsed.name,
      email: parsed.email,
      birthDate: parsed.birthDate ?? "",
      address: parsed.address,
      zip: parsed.zip
    };
  } catch {
    window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    return null;
  }
}

export function setStoredAccount(account: StoredAccount) {
  window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
  window.dispatchEvent(new Event(ACCOUNT_UPDATED_EVENT));
  return account;
}
