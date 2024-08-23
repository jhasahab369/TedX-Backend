/* global AtomPaynetz */


export function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export function openPay(data) {
    const options = {
        "atomTokenId": data.atomTokenId,
        "merchId": data.merchId,
        "custEmail": data.custEmail,
        "custMobile": data.custMobile,
        "returnUrl": data.returnUrl,
    }
    new AtomPaynetz(options, 'uat')
}

export async function initiatePayment(paymentData, paymentAction) {
    try {
        const data = await paymentAction(paymentData)
        await loadScript('https://psa.atomtech.in/staticdata/ots/js/atomcheckout.js?v=' + data.atomTokenId)
        openPay(data)
    } catch (error) {
        console.error('Payment initiation failed:', error)
        throw error
    }
}