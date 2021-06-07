import React from "react";

interface BootstrapContextState {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default BootstrapContextState