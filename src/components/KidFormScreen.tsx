import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { KidDetails } from "../App";

type Props = {
  kid: KidDetails;
  setKid: Dispatch<SetStateAction<KidDetails>>;
  onSubmit: () => void;
};

export default function KidFormScreen({ kid, setKid, onSubmit }: Props) {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (kid.name.trim()) onSubmit();
  };

  return (
    <section className="screen content-screen source-image-screen">
      <div className="source-image-overlay" />
      <div className="form-card">
        <div className="ghost-icon">👻</div>
        <h2>Bootham List-la Peru Add Pannalama?</h2>
        <form onSubmit={submit}>
          <label htmlFor="kid-name">Pasanga Peru *</label>
          <input
            id="kid-name"
            value={kid.name}
            placeholder="Example: Arjun"
            maxLength={25}
            required
            autoComplete="off"
            onChange={(event) => setKid({ ...kid, name: event.target.value })}
          />
          <label htmlFor="kid-age">Age <span>Optional</span></label>
          <input
            id="kid-age"
            type="number"
            min="1"
            max="18"
            value={kid.age}
            placeholder="Example: 8"
            onChange={(event) => setKid({ ...kid, age: event.target.value })}
          />
          <label htmlFor="kid-class">Class <span>Optional</span></label>
          <input
            id="kid-class"
            value={kid.className}
            placeholder="Example: 3rd Standard"
            maxLength={30}
            onChange={(event) => setKid({ ...kid, className: event.target.value })}
          />
          <button type="submit" className="primary-btn full-width">
            👻 Bootham Kitte Anuppu
          </button>
        </form>
        <small className="privacy-note">
          Fun entertainment-kaga mattum. School name, address, phone number maadhiri personal details share panna vendam.
        </small>
      </div>
    </section>
  );
}
