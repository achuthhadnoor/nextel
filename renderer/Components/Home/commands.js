export default (props) => {
    return (
        <div style={{ position: 'fixed', top: '0px', height: '100%', width: '100%', background: '#000', zIndex: '99999' }}>
            <Icon icon={x} style={{ padding: "1em" }} onClick={() => props.close()} />
            list of all the shortcuts
        </div>
    )
}