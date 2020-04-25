/* eslint key-spacing: 0 */
module.exports = {
    // session
    FETCH_PARKS:                'FETCH_PARKS',
    SET_CURRENT_PATROL_INDEX:   'SET_CURRENT_PATROL_INDEX',
    SET_SESSION_PARK:           'SET_SESSION_PARK',
    SET_MANUAL_MODE:           'SET_MANUAL_MODE',

    // issue reports
    ADD_ISSUE_REPORT:       'ADD_ISSUE_REPORT',
    UPDATE_ISSUE_REPORT:    'UPDATE_ISSUE_REPORT',
    DEL_ISSUE_REPORT:       'DEL_ISSUE_REPORT',
    FETCH_REPORTS:          'FETCH_REPORTS',
    RESET_REPORTS:          'RESET_REPORTS',

    // issue form
    SET_ISSUE_PARK:                     'SET_ISSUE_PARK',
    SET_ISSUE_COORDINATES:              'SET_ISSUE_COORDINATES',
    SET_ISSUE_DATE:                     'SET_ISSUE_DATE',
    SET_ISSUE_TITLE:                    'SET_ISSUE_TITLE',
    SET_ISSUE_DESCRIPTION:              'SET_ISSUE_DESCRIPTION',
    SET_ISSUE_TYPE:                     'SET_ISSUE_TYPE',
    SET_ISSUE_OTHER_TYPE_DESCRIPTION:   'SET_ISSUE_OTHER_TYPE_DESCRIPTION',
    SET_ISSUE_URGENCY:                  'SET_ISSUE_URGENCY',
    SET_ISSUE_STATUS:                   'SET_ISSUE_STATUS',
    SET_ISSUE_TRAIL:                    'SET_ISSUE_TRAIL',
    ADD_ISSUE_PHOTO:                    'ADD_ISSUE_PHOTO',
    ADD_ISSUE_PHOTOS:                   'ADD_ISSUE_PHOTOS',
    REMOVE_ISSUE_PHOTO:                 'REMOVE_ISSUE_PHOTO',
    CLEAR_ISSUE_FORM:                   'CLEAR_ISSUE_FORM',
    FILL_ISSUE_FORM:                    'FILL_ISSUE_FORM',

    // patrol reports
    FETCH_PATROL_REPORTS:               'FETCH_PATROL_REPORTS',
    ADD_PATROL_REPORT:                  'ADD_PATROL_REPORT',
    UPDATE_PATROL_REPORT:               'UPDATE_PATROL_REPORT',
    DELETE_PATROL_REPORT:               'DELETE_PATROL_REPORT',
    DELETE_ALL_PATROL_REPORTS:          'DELETE_ALL_PATROL_REPORTS',

    // patrol form
    SET_PATROL_DATE:                            'SET_PATROL_DATE',
    SET_PATROL_START_TIME:                      'SET_PATROL_START_TIME',
    SET_PATROL_END_TIME:                        'SET_PATROL_END_TIME',
    SET_PATROL_PARK:                            'SET_PATROL_PARK',
    INIT_PATROL_TRAILS:                         'INIT_PATROL_TRAILS',
    SET_PATROL_TRAILS:                          'SET_PATROL_TRAILS',
    SET_PATROL_NUM_VISITOR:                     'SET_PATROL_NUM_VISITOR',
    SET_PATROL_VISITOR_TYPES:                   'SET_PATROL_VISITOR_TYPES',
    SET_PATROL_VISITOR_OTHER_TYPE_DESCRIPTION:  'SET_PATROL_VISITOR_OTHER_TYPE_DESCRIPTION',
    SET_PATROL_NOTES:                           'SET_PATROL_NOTES',
    CLEAR_PATROL_FORM:                          'CLEAR_PATROL_FORM',
    FILL_PATROL_FORM:                           'FILL_PATROL_FORM',

    // types
    FALLEN_TREE:            'Fallen Tree',
    OVERGROWN_TRAIL:        'Overgrown Trail',
    EROSION:                'Erosion',
    VANDALISM:              'Vandalism',
    TRAIL_STRUCTURE_DAMAGE: 'Trail Structure Damage',
    TRAIL_CLOSURE:          'Trail Closure',
    ABANDONED_CAR:          'Abandoned Car',
    OTHER:                  'Other',

    // interaction types
    SAFETY_PREVENTION:      'Safety/Prevention',
    VIOLATION_WITNESSED:    'Crimes or violations witnessed',
    INTERPRETATION:         'Interpretations',
    DIRECTIONS_HANDED_OUT:  'Directions/Maps handed out',
    LOST_HIKERS_REPORTED:   'Lost hikers reported (Ranger called)',
    MINOR_MEDICAL:          'Minor Medical',
    MAJOR_MEDICAL:          'Major Medical (Ranger called)',
};
