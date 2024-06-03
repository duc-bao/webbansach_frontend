export async function my_request(duongDan:string){
    // Truy cập đường dẫn
    const response = await fetch(duongDan);
    // Nếu bị lỗi
    if(!response.ok){
        throw new Error(`Không thể truy cập ${duongDan}`);
    }
    // Nếu trả về ok
    return response.json();
}

export async function requestAdmin(endpoint: string) {
    const token = localStorage.getItem("token");
 
    
    // Truy cập đến đường dẫn
    const response = await fetch(endpoint, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`,
       },
    });
 
    // Thất bại
    if (!response.ok) {
       throw new Error(`Không thể truy cập ${endpoint}`);
    }
 
    // Thành công
    return response.json();
 }