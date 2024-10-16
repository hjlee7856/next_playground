'use client'
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from 'react';

interface Props {
    params: {
        id: string;
    }
}

export default function Update(props: Props){
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const id = props.params.id;

    // 수정
    const submitUpdate = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const title = evt.target.title.value;
        const body = evt.target.body.value;
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        });
        const topic = await resp.json();
        router.push(`/read/${topic.id}`);
        router.refresh();
    }

    // 갱신
    async function refresh(){
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`);
        const topic = await resp.json();
        setTitle(topic.title);
        setBody(topic.body);
    }

    useEffect(()=>{
        refresh();
    }, []);

    return <form onSubmit={submitUpdate}>
        <h2>Update</h2>
        <p><input type="text" name="title" placeholder="title" onChange={e=>setTitle(e.target.value)} value={title}/></p>
        <p><textarea name="body" palceholder="body" onChange={e=>setBody(e.target.value)} value={body}></textarea></p>
        <p><input type="submit" value="update" /></p>
    </form>
}