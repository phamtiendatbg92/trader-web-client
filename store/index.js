export const state = () => ({
    dialogInfo: {
        isShown: false,
        title: "",
        content: "",
    },
    isShownWaitingDlg: false,
})

export const getters = {
    dialogStatus: state => {
        return state.dialogInfo;
    },
    isShownWaitingDlg: state =>{
        return state.isShownWaitingDlg;
    }
    
}

export const actions = {
    showDialog(context, payload) {
        context.commit('showDialog', payload);
    },
    closeDialog(context) {
        context.commit('closeDialog');
    },
    showWaitingDialog(context, isShow){
        context.commit('showWaitingDialog', isShow);
    }
}

export const mutations = {
    showDialog(state, payload) {
        state.dialogInfo.isShown = true;
        state.dialogInfo.title = payload.title;
        state.dialogInfo.content = payload.content;
    },
    closeDialog(state){
        state.dialogInfo.isShown = false;
    },
    showWaitingDialog(state, isShow){
        state.isShownWaitingDlg = isShow;
    }
}