webpackJsonp([90819721439033],{504:function(e,o){e.exports={data:{markdownRemark:{html:'<h1>Windows &#x26; Kubernetes APIs</h1>\n<p>This document will grow into an API by API list of work that needs to be done to clarify Windows &#x26; Linux differences. This will be used to help clarify what needs to be eventually implemented (need a tracking issue), or not implemented (need a doc note).</p>\n<h2>Volumes</h2>\n<p><code>V1.Pod.Volumes</code></p>\n<p>Out of the various volume types, these should all be possible on Windows but tests are lacking:</p>\n<ul>\n<li>EmptyDirVolumeSource</li>\n<li>Secret</li>\n<li>hostPath</li>\n</ul>\n<p>The main gaps in Windows Server 2016 &#x26; 1709 are that symlinks are pretty much broken. The only ones that work are SMB/CIFS mount points. Workarounds need to be investigated.</p>\n<p><code>V1.Container.volumeMounts</code>\nMounting volumes across some (but not all) containers will need changes to Windows. Not ready in Windows Server 2016/1709.</p>\n<h3>Links</h3>\n<ul>\n<li><a href="https://github.com/kubernetes/kubernetes/issues/56875">FlexVolume does not work on Windows node</a></li>\n<li><a href="https://github.com/kubernetes/kubernetes/issues/56005">feature proposal add SMB(cifs) volume plugin</a></li>\n<li><a href="https://github.com/kubernetes/kubernetes/issues/56188">add NFS volume support for Windows</a></li>\n</ul>\n<h2>V1.Pod.Resources &#x26; V1.Container.ResourceRequirements</h2>\n<p><code>V1.Container.ResourceRequirements.limits.cpu</code>\n<code>V1.Container.ResourceRequirements.limits.memory</code></p>\n<p>Windows schedules CPU based on CPU count &#x26; percentage of cores. We need this represented because it can help optimize app performance. CPU count is immutable once set but you can change % of core allocations.</p>\n<p><code>V1.Container.ResourceRequirements.requests.cpu</code>\n<code>V1.Container.ResourceRequirements.requests.memory</code></p>\n<p>Also of note, requests aren\'t supported. Will pod eviction policies in the kubelet ensure reserves are met by not overprovisioning the node?</p>\n<p>Windows can either expose a NUMA topology matching the host (best performance) or fake it to be 1 big NUMA node (suboptimal). We should think of a way to turn this on/off later - probably q2 2018</p>\n<h3>Links</h3>\n<p><a href="https://github.com/kubernetes/kubernetes/issues/56734">Kubernetes Container Runtime Interface (CRI) doesn\'t support WindowsContainerConfig and WindowsContainerResources</a></p>\n<h2>Networking features</h2>\n<p><code>V1.Pod.dnsPolicy</code> - I think only ClusterFirst is implemented</p>\n<p><code>V1.Pod.hostNetwork</code> - Not feasible on Windows Server 2016 / 1709</p>\n<h2>IPC &#x26; Pid</h2>\n<p><code>V1.Pod.hostIPC</code>, <code>v1.pod.hostpid</code></p>\n<p>How important are these? They\'re not implemented in Windows Server 2016 / 1709, and I\'m not too sure if they\'d be helpful or not.</p>\n<p>For cases where a pod/container need to talk to the host docker / containerd daemon we could map a named pipe as a volume which would offer the same functionality as the unix socket to the Linux daemons. It works in moby but isn\'t hooked up in the kubelet yet.</p>\n<h2>Security</h2>\n<ul>\n<li><code>V1.Container.SecurityContext.Capabilities</code></li>\n<li><code>V1.Container.SecurityContext.seLinuxOptions</code></li>\n</ul>\n<p>These don\'t have Windows equivalents since the permissions model is substantially different</p>\n<p><code>V1.Container.SecurityContext.readOnlyRootFilesystem</code></p>\n<p>This is probably doable if needed but not possible in Windows Server 2016 / 1709.</p>\n<h3>User Mapping</h3>\n<p>There are a few fields that refer to uid/gid. These probably need to be supplemented with a Windows SID (string) and username (string)</p>\n<p><code>V1.podSecurityContext.runAsUser</code> provides a UID\n<code>V1.podSecurityContext.supplementalGroups</code> provides GID</p>'},site:{siteMetadata:{sigs:["sig-api-machinery","sig-apps","sig-architecture","sig-auth","sig-autoscaling","sig-aws","sig-azure","sig-big-data","sig-cli","sig-cloud-provider","sig-cluster-lifecycle","sig-cluster-ops","sig-contributor-experience","sig-docs","sig-gcp","sig-ibmcloud","sig-instrumentation","sig-multicluster","sig-network","sig-node","sig-openstack","sig-product-management","sig-release","sig-scalability","sig-scheduling","sig-service-catalog","sig-storage","sig-testing","sig-ui","sig-vmware","sig-windows"]}}},pathContext:{slug:"/sig-windows/api-tracking/"}}}});
//# sourceMappingURL=path---sig-windows-api-tracking-c51c42af9cdeeddda465.js.map