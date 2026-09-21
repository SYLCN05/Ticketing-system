import { getTickets } from "../Tickets/Tickets";
import { useEffect, useState } from "react";

export type Ticket = {
  id: number;
  ticket_description: string;
  ticket_priority: string;
  ticket_title: string;
  ticket_turnin_date: string;
};

export function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    getTickets()
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (error) {
    return <h1>[error]</h1>;
  }
  return (
    <div className="">
      <ul className="flex flex-wrap gap-4 items-center justify-center mt-20 text-theme-light font-mono  ">
        {!loading &&
          tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="bg-theme-blue w-md border-r-3 rounded-md p-4 max-w-2xl min-h-40 max-h-40 overflow-y-auto "
            >
              <h3>{ticket.ticket_priority}</h3>
              <h2 className="text-center text-lg">{ticket.ticket_title}</h2>
              <p>{ticket.ticket_description}</p>
              <button
                className="bg-theme-navy hover:bg-theme-blue rounded-xl min-w-20 min-h-10 mt-2"
                onClick={() => console.log("heloooo")}
              >
                Details
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
