import axios,{AxiosInstance,AxiosResponse} from 'axios';


export interface Blog {
  title: string;
  content: string;
  category: string;
  tags: string[];
}


const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});


export const fetchBlogByID = async(blogId:number):Promise<Blog>=>{
    try {
        const response: AxiosResponse<Blog> = await apiClient.get(`/${blogId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          throw new Error(`Axios error: ${error.message}`);
        } else {
          // Non-Axios error handling
          throw new Error("An unexpected error occurred");
        }
    }
}

export const fetchBlogs = async ()=>{
    try {
        const response: AxiosResponse<Blog> = await apiClient.get(`/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          throw new Error(`Axios error: ${error.message}`);
        } else {
          // Non-Axios error handling
          throw new Error("An unexpected error occurred");
        }
    }
}

export const createBlog = async (blog: Omit<Blog, 'id'>): Promise<Blog> =>
{
    try {
        const response: AxiosResponse<Blog> = await apiClient.post('/',blog);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          throw new Error(`Axios error: ${error.message}`);
        } else {
          // Non-Axios error handling
          throw new Error("An unexpected error occurred");
        }
    }
}



export const updateBlog = async (id:number,data:Partial<Blog>):Promise<Blog>=>{
    try {
        const response :AxiosResponse<Blog> = await apiClient.put(`/${id}`,data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          throw new Error(`Axios error: ${error.message}`);
        } else {
          // Non-Axios error handling
          throw new Error("An unexpected error occurred");
        }
    }
}

export const deleteBlog = async (id:number):Promise<Blog> =>{
    try {
        const response:AxiosResponse<Blog> = await apiClient.delete(`/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          throw new Error(`Axios error: ${error.message}`);
        } else {
          // Non-Axios error handling
          throw new Error("An unexpected error occurred");
        }
    }
}