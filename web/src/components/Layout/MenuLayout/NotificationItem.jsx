const NotificationItem = ({notification,...props}) => {
    return (
        <div className={`p-3 hover:cursor-pointer rounded-lg flex flex-row items-center hover:bg-slate-500 ${notification.isRead ? "" : "bg-slate-300"}` }>
           <p className="text-lg text-center font-extrabold text-black">{notification.content}</p> 
        </div>
    )
}

export default NotificationItem;