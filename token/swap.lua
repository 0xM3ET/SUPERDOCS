local ao = require('ao')

local abcdTokenId = "xmopVrAO7YKaDfWzg_dIVG-vB0AN8-_PpvZN05lBov4"
local wxyzTokenId = "Zu7584uSAmCrRHc4qnq1CpOdEWs4AzePzUZ8SdcyTi4"

-- Initialize State
Ratio = Ratio or 0.5
Fees = Fees or 0

CurrentBalance = {
    abcdToken = 0,
    wxyzToken = 0
}

local function getBalance(msg)
    if msg.From == abcdTokenId and msg.Tags.Balance then
        return true
    elseif msg.From == wxyzTokenId and msg.Tags.Balance then
        return true
    else
        return false
    end
end

local function isSwap()
    if Handlers.utils.hasMatchingTag("Function", "Swap") and Handlers.utils.hasMatchingTag("Action", "Credit-Notice") then
        return true
    else
        return false
    end
end

-- Function to get Balance
Handlers.add("GetBalance",
    getBalance,
    function(msg)
        -- Update the balance in the balances table
        if msg.From == abcdTokenId then
            CurrentBalance.abcdToken = tonumber(msg.Tags.Balance)
            print("Balance updated for abcdToken: " .. CurrentBalance.abcdToken)
            print(type(CurrentBalance.abcdToken))
        elseif msg.From == wxyzTokenId then
            CurrentBalance.wxyzToken = tonumber(msg.Tags.Balance)
            print("Balance updated for wxyzToken: " .. CurrentBalance.wxyzToken)
            print(type(CurrentBalance.wxyzToken))
        end
    end
)

-- Function to set the Ratio
Handlers.add(
    'SetRatio',
    Handlers.utils.hasMatchingTag('Action', 'SetRatio'),
    function(msg)
        if (msg.From == ao.id) then
            Ratio = msg.Tags.Ratio
            print(Ratio)
        else
            Handlers.utils.reply("Only Admin is allowed to Set the Ratio")(msg)
        end
    end
)

-- Function to set the Fees
Handlers.add(
    'SetFees',
    Handlers.utils.hasMatchingTag('Action', 'SetFees'),
    function(msg)
        if (msg.From == ao.id) then
            Fees = msg.Tags.Fees
            print(Fees)
        else
            Handlers.utils.reply("Only Admin is allowed to Set the Fees")(msg)
        end
    end
)

-- Function to Swap
Handlers.add(
    'Credit',
    isSwap,
    function(msg)
        local sender = msg.Tags.Sender
        local amount = msg.Tags.Quantity
        local amt = tonumber(amount)

        local exchangeAmount = amt / tonumber(Ratio)
        print(exchangeAmount)

        local finalAmount = math.floor(exchangeAmount - ((exchangeAmount * Fees) / 100));
        print(finalAmount)
        print(msg.Tags.Sender)
        print(msg.Tags.Quantity)
        if amt > 0 then
            if msg.Tags["X-ReceiveToken"] == "xyz" then
                print("Received " .. amount .. " from " .. sender)
                CurrentBalance.abcdToken = CurrentBalance.abcdToken + amt
                if tonumber(CurrentBalance.wxyzToken) > amt then
                    ao.send({
                        Target = wxyzTokenId,
                        Action = "Transfer",
                        Recipient = sender,
                        Quantity = finalAmount
                    })
                    print("Sent " .. finalAmount .. " to " .. sender)
                    CurrentBalance.wxyzToken = CurrentBalance.wxyzToken - amt
                else
                    print("Sorry! The Swap Contract doesn't have enough Tokens")
                    ao.send({
                        Target = abcdTokenId,
                        Action = "Transfer",
                        Recipient = sender,
                        Quantity = amt
                    })
                end
            elseif msg.Tags["X-ReceiveToken"] == "abc" then
                print("Received " .. amt .. " from " .. sender)
                CurrentBalance.wxyzToken = CurrentBalance.wxyzToken + amt
                if tonumber(CurrentBalance.abcdToken) > amt then
                    ao.send({
                        Target = abcdTokenId,
                        Action = "Transfer",
                        Recipient = sender,
                        Quantity = finalAmount
                    })
                    print("Sent " .. finalAmount .. " to " .. sender)
                    CurrentBalance.abcdToken = CurrentBalance.abcdToken - amt
                else
                    print("Sorry! The Swap Contract doesn't have enough Tokens")
                    ao.send({
                        Target = wxyzTokenId,
                        Action = "Transfer",
                        Recipient = sender,
                        Quantity = amt
                    })
                end
            else
                Handlers.utils.Reply("Invalid Request!")
            end
        else
            print("The Amount must be Greater than 0!")
        end
    end
)