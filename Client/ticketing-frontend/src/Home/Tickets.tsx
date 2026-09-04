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
    <div>
      <h2>Tickets:</h2>

      <ul>
        {!loading &&
          tickets.map((ticket) => (
            <li key={ticket.id}>
              <h2>{ticket.ticket_title}</h2>
              <p>{ticket.ticket_description}</p>
              <h3>{ticket.ticket_priority}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
