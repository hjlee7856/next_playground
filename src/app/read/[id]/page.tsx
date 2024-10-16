type ReadProps = {
    params: {
        id: string;
    };
};

export default async function Read(props: ReadProps) {
    const id = props.params.id;
    const resp = await fetch(`http://localhost:9999/topics/${id}`);
    const topic = await resp.json();
    return <>
        <h2>{topic.title}</h2>
        {topic.body}
    </>
}