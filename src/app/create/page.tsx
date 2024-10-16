'use client'
// 위의 코드를 사용하면 client component로 전환됨
// 클라이언트 컴포넌트가 되면 useEffect, useState, onSubmit과 같은 코드를 사용할 수 있게 됨

import { useRouter } from "next/navigation";
import React from "react";

export default function Create(){
    const router = useRouter();
    // useRouter를 사용하면 라우터 객체를 생성할 수 있음
    // useRouter는 client component에서만 사용 가능

    const submitData = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const title = evt.target.title.value;
        const body = evt.target.body.value;
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        });
        const topic = await resp.json();
        console.log("file: page.js:19 ~ Create ~ topic:", topic)

        router.push(`/read/${topic.id}`);
        // router.push를 사용하면 페이지 리로드 없이 사용자의 화면을 해당 페이지로 이동합니다.
        router.refresh();
        // router.refresh를 사용하면 서버 컴포넌트를 서버 쪽에서 다시 랜더링해서 새로 고침할 수 있습니다.
        // 여기서는 app/layout.js을 새로고침하기 위해서 사용된 코드입니다.
    }

    return <form onSubmit={submitData}>
        <h2>Create</h2>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="create" /></p>
    </form>
}