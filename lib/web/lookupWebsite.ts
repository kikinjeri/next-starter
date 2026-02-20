export async function lookupWebsiteFree(name: string, address?: string | null) {
  const query = `${name} ${address ?? ""} Ottawa`;
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
    query
  )}&format=json&no_redirect=1&no_html=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    let website: string | null = null;
    let phone: string | null = null;

    // Website from AbstractURL
    if (data.AbstractURL && data.AbstractURL.startsWith("https://")) {
      website = data.AbstractURL;
    }

    // Website from Results
    if (!website && data.Results?.length > 0) {
      const first = data.Results[0];
      if (first.FirstURL && first.FirstURL.startsWith("https://")) {
        website = first.FirstURL;
      }
    }

    // Phone number (sometimes in Infobox)
    if (data.Infobox?.content) {
      const phoneEntry = data.Infobox.content.find(
        (c: any) =>
          c.label?.toLowerCase().includes("phone") ||
          c.label?.toLowerCase().includes("telephone")
      );
      if (phoneEntry?.value) {
        phone = phoneEntry.value;
      }
    }

    return { website, phone };
  } catch {
    // ALWAYS return an object
    return { website: null, phone: null };
  }
}
