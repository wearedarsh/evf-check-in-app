export const brand = {
    copy: {
        login: 
            { 
                title: 'EVENT CHECK IN',
                button: 'Login',
                copyright: (year: number) => `© ${year} European Venous Forum Ltd`
            },
        courses:
            {
                headerTitle: 'Select a course',
                loadingCopy: 'Loading courses...',
                noDataCopy: 'You have no active courses'
            },
        sessionGroups:
            {
                headerTitle: 'Select a group',
                loadingCopy: 'Loading groups...',
                noDataCopy: 'You have no active groups'
            },
        sessions:
            {
                headerTitle: 'Select a session',
                loadingCopy: 'Loading sessions...',
                noDataCopy: 'You have no sessions for this group'
            },
        checkInConfirm:
            {
                headerTitle: 'Check in delegates',
                subTitle: 'How would you like to check in your delegates?',
                manualButton: 'Use list',
                scanButton: 'Scan badges'
            },
        scanBadges:
            {
                headerTitle: 'Scan badges',
                successfulScanAlertTitle: 'Success',
                successfulScanAlertBody: 'Scan successful',
                duplicateScanAlertTitle: 'Duplicate scan',
                duplicateScanAlertBody: 'This delegate has been checked in to this session already'
            }
    }

}
