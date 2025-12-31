import React, { useEffect, useState } from 'react'
import AppwriteTablesDB from '../appwrite/TablesDB.service.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Slide, toast } from 'react-toastify';

const appwriteTablesDB = new AppwriteTablesDB();
const fetchTodos = async () => {
    try {
        const allTodos = await appwriteTablesDB.listRows("todos");
        return allTodos;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createTodo = async(data) => {
    try{
        const newTodo = await appwriteTablesDB.createRow("todos", data);
        return newTodo;
    }catch(error){
        throw new Error(error.message);
    }
}

const TodoApp = () => {

    const { data: todos, isPending, isFetching, error, isError } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos
    })

    const [todoText, setTodoText] = useState("")
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            toast.success('🦄 New Todo Added!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide
            });
            setTodoText("");
            queryClient.invalidateQueries({queryKey: ["todos"]})
        },

        onError: (error) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    })

    const handleAddNewTodo = (event) => {
        event.preventDefault();
        mutation.mutate({text: todoText})
    }


    if (isPending) {
        return <h1>Loading....</h1>
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>
    }

    return (
        <main>
            <section>
                <form onSubmit={handleAddNewTodo}>
                    <div>
                        <input value={todoText} onChange={(event) => setTodoText(event.target.value)} placeholder='Write a new todo here...' type="text" />
                    </div>
                    <button disabled={mutation.isPending} type="submit">
                        {mutation.isPending ? "Adding todo..." : "Add Todo"}
                    </button>
                </form>
            </section>


            <section>
                {
                    todos.map((todo) => (
                        <h1 className='underline font-semibold' key={todo.$id}>{todo.text}</h1>
                    ))
                }

                {
                    isFetching && <p>Todos are refetching...</p>
                }

                {
                    mutation.isError && <p>{mutation.error.message}</p>
                }
            </section>
        </main>

    )
}

export default TodoApp