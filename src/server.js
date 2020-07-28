import { Server, Model } from "miragejs"

export const server = new Server({
    models: {
        alarm: Model,
        metricSources: Model,
        metricTypes: Model
    },

    routes() {
        this.get("/alarms", (schema, request) => {
            let { Name, Status } = request.queryParams;

            console.log(request.queryParams);

            return schema.alarms.where(al => ( al.Name.toUpperCase().includes(Name.toUpperCase()) || Name === "all" ) && ( al.Status === Status || Status === 'all' ));
        },  { timing: 1500 });

        this.get("/alarms/:id", (schema, request) => {
            let id = request.params.id;
            
            return schema.alarms.find(id);
        }, { timing: 1500 });

        this.put('/alarms/:id', (schema, request) => {
            let payloadBody = JSON.parse(request.requestBody);
            let alarmToModify = schema.alarms.find(request.params.id);

            return alarmToModify.update(payloadBody);
        });

        this.post('/alarms', (schema, request) => {
            let payloadBody = JSON.parse(request.requestBody);

            return schema.alarms.create(payloadBody);
        });

        this.delete("/alarms/:id", (schema, request) => {
          let id = request.params.id
        
          return schema.alarms.find(id).destroy()
        });

        this.get('/metricTypes');
        this.get('/metricSources');
    },

    seeds(server) {
        server.create("alarm", { Name: "ExampleAlarm", Source: "Server 1", Metric: "CPU Usage", TriggerAt: { value: 80, condition: "lower" }, Status: 'P'});
        server.create("metricType", { Name: "FS Usage" });
        server.create("metricType", { Name: "Memory Usage" });
        server.create("metricType", { Name: "CPU Usage" });
        server.create("metricSource", { Name: "Server 1" });
        server.create("metricSource", { Name: "Server 2" });
    }
});