import '../styles/groupsFeed.css';


export default function GroupList({group}) {
    const {id , title  , description  ,isMember ,  status , totalMembers} = group
    return <>
    <aside className="group-sidebar">
            <div className="group-header">
                <h2>{title}</h2>
                <div className="group_avatar"></div>
            </div>
            <p className="text-muted">{description}.</p>
            <div className="group-stats">
                {isMember ? <button className="open-button">OPEN</button> :
                status === "pending" ? <button className="pending-button">PENDING</button> :
                status === "intivation" ? <button className="rejected-button">accept</button> :
                <button className="join-button">JOIN</button>}
                <div>
                    <h3>{totalMembers}</h3>
                    <p className="text-muted">Members</p>
                </div>
            </div>
        </aside>
    </>
}