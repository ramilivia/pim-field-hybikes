export async function getItems(endpoint: string, authToken: string, query: string) {
    const data = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ query }),
        })
        return data
}