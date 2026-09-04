import type { Ticket } from "../Home/Tickets";

export async function getTickets(): Promise<Ticket[]> {
  const baseUrl = "https://localhost:7017/";
  let data: Ticket[] = [];
  try {
    const response = await fetch(`${baseUrl}ticketingapi/Get-Tickets`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    data = await response.json();
  } catch (e) {
    console.error(e);
  }
  return data;
}
