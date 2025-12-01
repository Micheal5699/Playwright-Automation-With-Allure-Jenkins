export function compareTransferLists(list1:string[] , list2:string []) {
    for (const transfer of list1) {
        let isPresent = false;

        for (const transfer2 of list2) {
            if (transfer == transfer2) {
                isPresent = true;
                break;
            }
        }

        if (!isPresent) {
            return false;
        }
    }

    return true;
}