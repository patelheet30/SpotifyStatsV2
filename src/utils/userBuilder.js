import { findFile } from './fileFinder.js';

class User {
    constructor(name, email, followers, following, creationDate, gender, country, birthday) {
        this.name = name;
        this.email = email;
        this.followers = followers;
        this.following = following;
        this.creationDate = creationDate;
        this.gender = gender;
        this.country = country;
        this.birthday = birthday;
    }

    gatherData (fileArray) {
        return new Promise((resolve, reject) => {
            const userDataFile = findFile('MyData/Userdata.json', fileArray);
            const followDataFile = findFile('MyData/Follow.json', fileArray);

            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const userDataJSON = JSON.parse(reader.result);
                    this.name = userDataJSON.username;
                    this.email = userDataJSON.email;
                    this.creationDate = formatDate(userDataJSON.creationTime);
                    this.gender = userDataJSON.gender.charAt(0).toUpperCase() + userDataJSON.gender.slice(1).toLowerCase();
                    this.country = userDataJSON.country;
                    this.birthday = formatDate(userDataJSON.birthdate);

                    const reader2 = new FileReader();
                    reader2.onload = () => {
                        try {
                            const followDataJSON = JSON.parse(reader2.result);
                            this.followers = followDataJSON.followerCount;
                            this.following = followDataJSON.followingUsersCount;
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    };
                    reader2.readAsText(followDataFile);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(userDataFile);
        });
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const suffix = (day % 10 === 1 && day !== 11)
        ? 'st'
        : (day % 10 === 2 && day !== 12)
            ? 'nd'
            : (day % 10 === 3 && day !== 13)
                ? 'rd'
                : 'th';

    return `${day}${suffix} ${monthNames[monthIndex]} ${year}`;
}

export default User;