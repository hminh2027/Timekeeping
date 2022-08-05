import moment from 'moment';
const NotificationItem = ({notification,...props}) => {
    const {author} = notification
    return (
        <div className={`p-3 hover:cursor-pointer rounded-lg flex flex-row items-center hover:bg-slate-300` }>
            <div className="flex">
                <img src={author.avatar} alt="avatar" className="w-[56px] h-[56px] rounded-full mr-1"/>
                <div className="flex-1">
                    <p className={`w-full text-base text-left text-black ${notification.isRead? "font-normal":"font-extrabold"}`}>
                        {notification.content.replace(notification.authorId,author.lastName+" "+author.firstName)}
                    </p> 
                    <p className="text-left text-sm text-slate-500">
                        {moment(notification.createdAt).fromNow()}
                    </p>
                </div>

            </div>

        </div>
    )
}

export default NotificationItem;