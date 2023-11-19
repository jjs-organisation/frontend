export function NoProjects() {
    return(
        <div className='np-1'>
            <div className='np-2'>
                <span className='np-3'>
                    ⚠️
                </span>
                You can't create a project until auth
            </div>
        </div>
    )
}
export function NoProjectsLogged() {
    return(
        <div className='np-1'>
            <div className='np-2'>
                <span className='np-3'>
                    ⚠️
                </span>
                You dont have any project right now,
                Let's create it!
            </div>
        </div>
    )
}