const Post = ({data}) => {
  return (
    <>
    <div>ID: {data.id}</div>
    <div>{data.sent}</div>
    <div>{data.received}</div>
    <div>{data.produced}</div>
    <div>{data.date}</div>
    </>
  )
}

export default Post