"use client"
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';

// app/layout.js 전체를 client component로 전환해도 되지만
// server component의 이점을 포기하기는 싫기 때문에
// 여기서는 client component의 기능이 필요한 부분만 별도의 컴포넌트로 분리
export function Control() {
    // server component 내에서는 현재 동적 라우팅의 값([id])을 layout 안에서는 알 수 없음
    // useParams를 사용해야 하는데 useParams는 client component
    const params = useParams();
    const id = params.id;
    const router = useRouter();

    const clickDelete = async () => {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
            method: 'DELETE',
        });
        await resp.json();
        router.push('/');
        router.refresh();
    }

    return (
        <ul>
            <li><Link href="/create">Create</Link></li>
            {id ? <>
                <li>
                    <Link href={"/update/"+id}>Update</Link>
                </li>
                <li>
                    <button onClick={clickDelete}>delete
                    </button>
                </li>
            </> : null}
        </ul>
    );
}