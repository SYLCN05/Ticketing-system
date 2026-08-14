using TicketingAPI.Models;
using System.Text;
using System.Text.Json;
namespace TicketingAPI.Services
{
    public class TicketAIService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public TicketAIService(HttpClient client, IConfiguration configuration)
        {
            _httpClient = client;
            _apiKey = configuration["Keys:Gemini-Key"] ?? throw new InvalidOperationException("Probleem met api key");

        }

        public async Task<PriorityResult?> AnalyzeTicketPriority(string title, string description)
        {
            var endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key={_apiKey}";

            var payload = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new
                            {
                                text = $"""
                            Analyseer het volgende supportticket en bepaal de prioriteit (Low, Medium, High, Critical).
                            
                            Titel: {title}
                            Beschrijving: {description}
                            
                            Geef uitsluitend JSON terug volgens dit schema:
                            
                              "priority": "Low | Medium | High | Critical",
                              "reasoning": "korte uitleg in het Nederlands",
                              "confidence": 0.0 tot 1.0
                            
                            """
                            }
                        }
                    }
                },
                generationConfig = new
                {
                    response_mime_type = "application/json"
                }
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var jsonResponse = await this._httpClient.PostAsync(endpoint, jsonContent);

            jsonResponse.EnsureSuccessStatusCode();

            var responseBody = await jsonResponse.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(responseBody);
            var rawJsonText = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();
            Console.WriteLine(rawJsonText);

            return JsonSerializer.Deserialize<PriorityResult>(rawJsonText!, new JsonSerializerOptions { PropertyNameCaseInsensitive = true});
        }
    }
}
