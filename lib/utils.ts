const BASE_URL = 'https://67f927db094de2fe6ea0a709.mockapi.io';
const PATH_PLURAL = '/bikes';
const PATH_SINGLE = (id: string) => (`/bikes/${id}`);



export async function getItems() {
    try {
        const endpoint = `${BASE_URL}${PATH_PLURAL}`;
        console.log(endpoint);
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

export async function getItem(id: string) {
    try {
        const endpoint = `${BASE_URL}${PATH_SINGLE(id)}`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error;
    }
}