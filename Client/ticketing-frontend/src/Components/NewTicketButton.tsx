import { useState } from "react";

export function NewTicketButton() {
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formdata = new FormData(form);

    const ticketData = Object.fromEntries(formdata.entries());

    try {
      const response = await fetch(
        "https://localhost:7017/ticketingapi/Create-Ticket",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(ticketData),
        },
      );

      if (!response.ok) {
        throw new Error(`fout bij het ophalen: ${response.status}`);
      }

      setOpen(false);
    } catch (error) {
      console.error(`fout bij het ophalen: ${error}`);
    }
  };
  return (
    <>
      <button
        className="bg-theme-navy hover:bg-theme-blue rounded-xl min-w-20 min-h-10 mt-2 text-white p-2"
        onClick={() => setOpen(!isOpen)}
      >
        New ticket
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <div className="relative z-10 bg-theme-blue border border-white/10 rounded-xl p-6 w-full max-w-lg shadow-2xl text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nieuwe ticket</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                X
              </button>
            </div>
            <div>
              <form
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <label>Ticket Title</label>
                <input
                  type="text"
                  name="ticket_title"
                  className="border min-h-[5vh] rounded-md p-2"
                  maxLength={100}
                />
                <label>Ticket Beschrijving</label>
                <input
                  type="text"
                  name="ticket_description"
                  className="border min-h-[5vh] rounded-md p-2"
                  maxLength={100}
                />
                <input
                  type="submit"
                  value="Indienen"
                  className="max-w-[10vw] bg-theme-navy hover:bg-theme-blue hover:cursor-pointer text-white rounded-2xl self-center p-2"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
