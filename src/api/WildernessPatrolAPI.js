import ToFormData from './ToFormData';

// Issues
// INDEX  - curl https://cognitionis.net/issues/
// SHOW   - curl https://cognitionis.net/issues/1
// CREATE - curl -F 'issue[title]=MegaIssue' -F 'issue[description]=description' -F "issue[photos]=@/Users/Elendar/Desktop/protob.jpg" https://cognitionis.net/issues
// UPDATE - curl -XPATCH -d 'issue[title]=SupraMegaIssue' https://wilderness.42.us.org/issues/1
// DESTROY curl -X DELETE https://cognitionis.net/issues/1
// curl https://cognitionis.net/issues/2
// curl -F 'issue[title]=MegaIssue' -F 'issue[description]=description' -F "issue[photos_attributes][][photo]=@/Users/Elendar/Desktop/red_flag.jpg" https://cognitionis.net/issues
// curl -F 'issue[title]=MegaIssue' -F "issue[trails_issues_attributes][][trail_id]=2" -F "issue[parks_issues_attributes][][park_id]=2" -F "issue[trails_issues_attributes][][trail_id]=1" -F "issue[parks_issues_attributes][][park_id]=1"  https://cognitionis.net/issues


// Patrols
// INDEX  - curl https://cognitionis.net/patrols/
// SHOW   - curl https://cognitionis.net/patrols/1
// CREATE - curl -F 'patrol[numVisitor]=39' http://cognitionis.net/patrols
// UPDATE - curl -XPATCH -d 'patrol[numVisitor]=42' https://cognitionis.net/patrols/1
// DESTROY curl -X DELETE https://cognitionis.net/patrols/1
// curl -F 'patrol[numVisitor]=42' -F "patrol[trails_patrols_attributes][][trail_id]=2" -F "patrol[parks_patrols_attributes][][park_id]=2" -F "patrol[trails_patrols_attributes][][trail_id]=1" -F "patrol[parks_patrols_attributes][][park_id]=1"  https://cognitionis.net/patrols

// Park
// INDEX  - curl https://cognitionis.net/parks/
// SHOW   - curl https://cognitionis.net/parks/1
// CREATE - curl -XPOST -d 'park[name]=MegaPark' https://cognitionis.net/parks
// UPDATE - curl -XPATCH -d 'park[name]=MegaPark' https://cognitionis.net/parks/1
// DESTROY curl -X DELETE https://cognitionis.net/parks/1
// curl -XPATCH -F 'park[westLon]=-122.3240441' -F 'park[eastLon]=-122.141377' -F 'park[northLat]=37.23396985' -F 'park[southLat]=37.07933029' https://cognitionis.net/parks/2
// Trail
// INDEX  - curl https://cognitionis.net/parks/1/trails
// SHOW   - curl https://cognitionis.net/parks/1/trails/1
// CREATE - curl -XPOST -d 'trail[name]=MegaTrail' https://cognitionis.net/parks/1/trails
// UPDATE - curl -XPATCH -d 'trail[name]=MegaTrail' https://cognitionis.net/parks/1/trails/1
// DESTROY curl -X DELETE https://cognitionis.net/parks/1/trails/1



const DEV = false;
const url = 'https://wilderness.42.us.org';
// const url = 'http://localhost:3000'

/**
 * Wilderness Patrol API
 */
const WPAPI = {
    url,
    patrols: { url: `${url}/patrols/` },
    issues: { url: `${url}/issues/` },
    parks: { url: `${url}/parks.json` },
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    headersFormData: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },

    /**
     * Get from server and return array of issue objects. On reject, return empty array.
     * @returns {array};
     */
    fetchIssues() {
        return fetch(WPAPI.issues.url, {
            method: 'GET',
            headers: WPAPI.headers,

        })
            .then((response) => {
                if (response.ok) return response.json();
                return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
            })
            .then((response) => {
                this.setState({
                    issueList: response
                })
            })
            .then(() => {
                console.log(this.state)
            })
            .catch((reason) => {
                if (DEV) console.log(reason);
                return [];
            });
    },

    /**
     * Adds formatted issue object and returns fetch response.
     * @param {object} newIssue;
     * @return {response};
     */
    createIssue(newIssue) {
        const formdata = ToFormData.issue(newIssue);
        if (DEV) console.log(`APIcreateIssue...newIssue=${JSON.stringify(newIssue)}`);
        if (DEV) console.log(`APIcreateIssue...formdata=${JSON.stringify(formdata)}`);

        return fetch(WPAPI.issues.url, {
            method: 'POST',
            headers: WPAPI.headersFormData,
            body: formdata,
        });
    },

    /**
     * Update issue
     * @param {string} id;
     * @param {object} updatedIssue only requires updated fields;
     * @returns {fetchResult};
     */
    updateIssue(id, updatedIssue) {
        const formdata = ToFormData.issue(updatedIssue);
        if (DEV) console.log(`APIupdateIssue...updatedIssue=${JSON.stringify(updatedIssue)}`);
        if (DEV) console.log(`APIupdateIssue...formdata=${JSON.stringify(formdata)}`);

        return fetch(`${WPAPI.issues.url}${id}`, {
            method: 'PATCH',
            headers: WPAPI.headersFormData,
            body: formdata,
        });
    },

    /**
     * Update issue formdata
     * @param {string} id ;
     * @param {FormData} formData ;
     * @returns {fetchResult};
     */
    updateIssueFormData(id, formData) {
        return fetch(`${WPAPI.issues.url}${id}`, {
            method: 'PATCH',
            headers: WPAPI.headersFormData,
            body: formData,
        });
    },

    /**
     * Delete issue with id.
     * @param {string} id;
     * @return {null};
     */
    deleteIssue(id) {
        return fetch(`${WPAPI.issues.url}${id}`, {
            method: 'DELETE',
            headers: WPAPI.headers,
        });
    },

    /**
     * Get from server and return array of patrol objects. Return empty array on error.
     * @return {array};
     */
    fetchPatrols() {
        return fetch(WPAPI.patrols.url, {
            method: 'GET',
            headers: WPAPI.headers,
        })
            .then((response) => {
                if (response.ok) return response.json();
                return Promise.reject(`APIfetchPatrols...ok=${response.ok}, response=${JSON.stringify(response)}`);
            })
            .catch((reason) => {
                if (DEV) console.log(reason);
                return [];
            });
    },

    /**
     * Adds formatted patrol object and returns fetch response.
     * @param {object} newPatrol;
     * @return {response};
     */
    createPatrol(newPatrol) {
        const formdata = ToFormData.patrol(newPatrol);
        if (DEV) console.log(`APIcreatePatrol...newPatrol=${JSON.stringify(newPatrol)}`);
        if (DEV) console.log(`APIcreatePatrol...formdata=${JSON.stringify(formdata)}`);

        return fetch(WPAPI.patrols.url, {
            method: 'POST',
            headers: WPAPI.headersFormData,
            body: formdata,
        }).catch((error) =>{
            if (DEV) console.log(`APIcreatePatrol...error=${error}`);
        });
    },

    /**
     * Update patrol
     * @param {string} id;
     * @param {object} updatedPatrol only requires updated fields;
     * @returns {fetchResult};
     */
    updatePatrol(id, updatedPatrol) {
        const formdata = ToFormData.patrol(updatedPatrol);
        if (DEV) console.log(`APIupdatePatrol...updatedPatrol=${JSON.stringify(updatedPatrol)}`);
        if (DEV) console.log(`APIupdatePatrol...formdata=${JSON.stringify(formdata)}`);
        if (formdata == null) return Promise.reject('Please make changes before submitting an update!');
        return fetch(`${WPAPI.patrols.url}${id}`, {
            method: 'PATCH',
            headers: WPAPI.headersFormData,
            body: formdata,
        }).catch((error) => {
            if (DEV) console.log(`APIupdatePatrol...error=${error}`);
        });
    },

    /**
     * Delete patrol with id.
     * @param {string} id;
     * @return {null};
     */
    deletePatrol(id) {
        return fetch(`${WPAPI.patrols.url}${id}`, {
            method: 'DELETE',
            headers: WPAPI.headers,
        });
    },

    /**
     * Get from server and return array of park objects
     * @return {array};
     */
    fetchParks() {
        return fetch(WPAPI.parks.url, {
            method: 'GET',
            headers: WPAPI.headers,
        })
            .then((response) => {
                if (response.ok) return response.json();
                if (DEV) console.log(`APIfetchParks...ok=${response.ok}, response=${JSON.stringify(response)}`);
                return {};
            })
            .catch((error) => {
                if (DEV) console.log(`APIfetchParks...error=${error}`);
            });
    },

    getMapFileURL(park) {
        return (WPAPI.url + park.mapFile.mapFile.url);
    },

    /**
     * Get photo URL.
     * @param {object} report from server;
     * @param {number} photoIndex for the photo of interest;
     * @returns {string} URL to photo;
     */
    getPhotoURL(report, photoIndex = 0) {
        return `${WPAPI.url}${report.photos[photoIndex].photo.photo.url}`;
    },

    /**
     * Get photo thumbnail URL.
     * @param {object} report from server;
     * @param {number} photoIndex;
     * @returns {string} URL to thumbnail;
     */
    getPhotoThumbURL(report, photoIndex = 0) {
        if (DEV) console.log(`APIgetPhotoThumbURL...report=${JSON.stringify(report)}, photoIndex=${photoIndex}`);
        return `${WPAPI.url}${report.photos[photoIndex].photo.photo.thumb.url}`;
    },
};

export default WPAPI;
