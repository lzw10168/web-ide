function PreviewResult(props) {
  const { flag } = props
  return (
    <iframe
      title="preview"
      src={`${import.meta.env.VITE_SERVER_URL}/html?flag=${flag}`}
      style={{
        width: "100%",
        height: `100%`,
        margin: 0,
        padding: 0,
        border: "none",
      }}
    ></iframe>
  )
}

export default PreviewResult
