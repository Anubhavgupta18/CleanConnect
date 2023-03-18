const cron = require('node-cron');
const Report = require('../models/report-model');
const User = require('../models/user-model');
const Agent = require('../models/agent-model');
/**
 * every 5 minutes
 * we will just check is there any email which is to be sent 
 * by now and is PENDING
 */

const assignAgentReportJobs = async () => {
    cron.schedule('*/2 * * * *', async () => {
        const reports = await Report.find();
        reports.forEach(async (report) => {
            if (!report.agent) {
                const user = await User.findById(report.user);
                const agent = await Agent.findOne({
                    address: {
                        pincode: user.address.pincode,
                    }
                });
                report.agent = agent._id;
            }
        })
    })
}

module.exports = {
    assignAgentReportJobs
};
