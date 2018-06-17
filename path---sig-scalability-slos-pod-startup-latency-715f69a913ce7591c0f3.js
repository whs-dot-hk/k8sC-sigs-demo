webpackJsonp([0x6bab8078dcdb],{490:function(e,t){e.exports={data:{markdownRemark:{html:'<h2>Pod startup latency SLI/SLO details</h2>\n<h3>User stories</h3>\n<ul>\n<li>As a user of vanilla Kubernetes, I want some guarantee how quickly my pods\nwill be started.</li>\n</ul>\n<h3>Other notes</h3>\n<ul>\n<li>\n<p>Only schedulable and stateless pods contribute to the SLI:</p>\n<ul>\n<li>If there is no space in the cluster to place the pod, there is not much\nwe can do about it (it is task for Cluster Autoscaler which should have\nseparate SLIs/SLOs).</li>\n<li>If placing a pod requires preempting other pods, that may heavily depend\non the application (e.g. on their graceful termination period). We don\'t\nwant that to contribute to this SLI.</li>\n<li>Mounting disks required by non-stateless pods may potentially also require\nnon-negligible time, not fully dependent on Kubernetes.</li>\n</ul>\n</li>\n<li>We are explicitly excluding image pulling from time the SLI. This is\nbecause it highly depends on locality of the image, image registry performance\ncharacteristic (e.g. throughput), image size itself, etc. Since we have\nno control over any of those (and all of those would significantly affect SLI)\nwe decided to simply exclude it.</li>\n<li>We are also explicitly excluding time to run init containers, as, again, this\nis heavily application-dependent (and does\'t depend on Kubernetes itself).</li>\n<li>\n<p>The answer to question "when pod should be considered as started" is also\nnot obvious. We decided for the semantic of "when all its containers are\nreported as started and observed via watch", because:</p>\n<ul>\n<li>we require all containers to be started (not e.g. the first one) to ensure\nthat the pod is started. We need to ensure that pontential regressions like\nlinearization of container startups within a pod will be catch by this SLI.</li>\n<li>note that we don\'t require all container to be running - if some of them\nfinished before the last one was started that is also fine. It is just\nrequired that all of them has been started (at least once).</li>\n<li>we don\'t want to rely on "readiness checks", because they heavily\ndepend on the application. If the application takes couple minutes to\ninitialize before it starts responding to readiness checks, that shouldn\'t\ncount towards Kubernetes performance.</li>\n<li>even if your application started, many control loops in Kubernetes will\nnot fire before they will observe that. If Kubelet is not able to report\nthe status due to some reason, other parts of the system will not have\na way to learn about it - this is why reporting part is so important\nhere.</li>\n<li>since watch is so centric to Kubernetes (and many control loops are\ntriggered by specific watch events), observing the status of pod is\nalso part of the SLI (as this is the moment when next control loops\ncan potentially be fired).</li>\n</ul>\n</li>\n</ul>\n<h3>TODOs</h3>\n<ul>\n<li>We should try to provide guarantees for non-stateless pods (the threshold\nmay be higher for them though).</li>\n<li>Revisit whether we want "watch pod status" part to be included in the SLI.</li>\n</ul>\n<h3>Test scenario</h3>\n<p><strong>TODO: Descibe test scenario.</strong></p>'},site:{siteMetadata:{sigs:["sig-api-machinery","sig-apps","sig-architecture","sig-auth","sig-autoscaling","sig-aws","sig-azure","sig-big-data","sig-cli","sig-cloud-provider","sig-cluster-lifecycle","sig-cluster-ops","sig-contributor-experience","sig-docs","sig-gcp","sig-ibmcloud","sig-instrumentation","sig-multicluster","sig-network","sig-node","sig-openstack","sig-product-management","sig-release","sig-scalability","sig-scheduling","sig-service-catalog","sig-storage","sig-testing","sig-ui","sig-vmware","sig-windows"]}}},pathContext:{slug:"/sig-scalability/slos/pod-startup-latency/"}}}});
//# sourceMappingURL=path---sig-scalability-slos-pod-startup-latency-715f69a913ce7591c0f3.js.map