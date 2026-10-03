"use client";

const field =
  "w-full border-0 border-b border-white/15 bg-transparent py-4 text-[16px] tracking-normal text-white outline-none placeholder:text-white/40 focus:border-[#7950e2]";

export function SideForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-[30px] border border-white/10 bg-[#080808] px-8 py-8"
    >
      <input className={field} type="text" name="name" placeholder="Name" aria-label="Name" />
      <input className={field} type="tel" name="phone" placeholder="Phone" aria-label="Phone" />
      <input className={field} type="email" name="email" placeholder="Email" aria-label="Email" />
      <textarea className={`${field} h-32 resize-none`} name="message" placeholder="Your message" aria-label="Your message" />
      <button type="submit" className="btn p mt-6">
        Submit
      </button>
    </form>
  );
}
