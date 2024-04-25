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

