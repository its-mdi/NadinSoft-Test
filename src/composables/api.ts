export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export async function fetchComments(params?: PaginationParams): Promise<PaginatedResponse<Comment>> {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const allData: Comment[] = await response.json()
    const total = allData.length

    if (params) {
      const { page, pageSize } = params
      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      const paginatedData = allData.slice(startIndex, endIndex)
      const totalPages = Math.ceil(total / pageSize)

      return {
        data: paginatedData,
        total,
        page,
        pageSize,
        totalPages,
      }
    }

    return {
      data: allData,
      total,
      page: 1,
      pageSize: total,
      totalPages: 1,
    }
  } catch (error) {
    throw error
  }
}

