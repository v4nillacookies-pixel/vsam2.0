"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  setStoredAccount,
  type StoredAccount
} from "@/lib/account-storage";
import "./account-modal.css";

export function AccountModal({
  account,
  onClose,
  onSave
}: {
  account: StoredAccount | null;
  onClose: () => void;
  onSave: (account: StoredAccount) => void;
}) {
  const [name, setName] = useState(account?.name ?? "");
  const [email, setEmail] = useState(account?.email ?? "");
  const [birthDate, setBirthDate] = useState(account?.birthDate ?? "");
  const [address, setAddress] = useState(account?.address ?? "");
  const [zip, setZip] = useState(account?.zip ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextAccount = setStoredAccount({
      name: name.trim(),
      email: email.trim(),
      birthDate,
      address: address.trim(),
      zip: zip.trim()
    });

    onSave(nextAccount);
    onClose();
  }

  return (
    <div className="account-modal-backdrop" role="presentation">
      <section
        aria-labelledby="account-modal-title"
        aria-modal="true"
        className="account-modal"
        role="dialog"
      >
        <div className="account-modal-heading">
          <div>
            <p>Cuenta</p>
            <h2 id="account-modal-title">
              {account ? "Actualiza tu cuenta" : "Crea tu cuenta"}
            </h2>
          </div>
          <button aria-label="Cerrar" onClick={onClose} type="button">
            x
          </button>
        </div>

        <form className="account-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              autoFocus
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej. Andrea Martinez"
              required
              value={name}
            />
          </label>

          <label>
            Email
            <input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
              required
              type="email"
              value={email}
            />
          </label>

          <label>
            Fecha de nacimiento
            <input
              onChange={(event) => setBirthDate(event.target.value)}
              required
              type="date"
              value={birthDate}
            />
          </label>

          <label>
            Domicilio
            <input
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Ej. Av. 10 Norte 123"
              required
              value={address}
            />
          </label>

          <label>
            Codigo postal
            <input
              inputMode="numeric"
              onChange={(event) => setZip(event.target.value)}
              pattern="[0-9]{5}"
              placeholder="77710"
              required
              value={zip}
            />
          </label>

          <div className="account-modal-actions">
            <button onClick={onClose} type="button">
              Cancelar
            </button>
            <button type="submit">
              Guardar cuenta
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
