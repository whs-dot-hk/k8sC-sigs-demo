webpackJsonp([0xde7d267fa868],{487:function(e,t){e.exports={data:{markdownRemark:{html:'<h1>Formal Scalability Processes</h1>\n<p><em>by Shyam JVS, Google Inc</em></p>\n<p><strong>February 2018</strong></p>\n<h2>Introduction</h2>\n<p>Scalability is a very crucial aspect of kubernetes and has allowed many customers to adopt it with confidence. K8s <a href="http://blog.kubernetes.io/2017/03/scalability-updates-in-kubernetes-1.6.html">started scaling to 5000</a> nodes beginning from release 1.6. Building and maintaining a performant and scalable system needs conscious efforts from the whole developer community. Lack of solid measures have caused problems (both scalability and release-related) in the past - for e.g during <a href="https://github.com/kubernetes/kubernetes/issues/47344">release-1.7</a>, <a href="https://github.com/kubernetes/kubernetes/issues/53255">release-1.8</a> and <a href="https://github.com/kubernetes/kubernetes/issues/56062">in general</a>. We need them to ensure that the effort is well-streamlined with proper checks and balances in place. Of course they may evolve over time to suit the community/project’s needs better.</p>\n<h2>Goal</h2>\n<p>Our goal is to make scalability of kubernetes sustainable. That is, to let k8s scalability thrive despite the ever-increasing rate of developer contributions. More concretely, we want to achieve the following criteria (subject to future changes):</p>\n<p><code>Engineering time spent on debugging of scalability regressions is &#x3C; 2 days/month</code></p>\n<h2>Overview</h2>\n<p>Development process can broadly be divided into 3 phases - i.e design, implementation and testing. Each phase poses different challenges wrt scalability. And not every change needs to pass through each phase. For e.g, a refactoring, dependency update or a simple code change would likely not have a design phase, while a new feature (e.g apiserver webhooks) would. We propose few processes for each of these phases to help with scalability.</p>\n<p>At a high-level, these processes are (in the order in which we want to add them):</p>\n<ul>\n<li>\n<p><a href="#implementation--pre-submit-phase">Implementation (or) pre-submit phase</a>:</p>\n<ul>\n<li>Add optional PR jobs for scalability (both medium and large scale)</li>\n<li>Add mandatory presubmit jobs for scalability (only medium scale - fast &#x26; healthy)</li>\n</ul>\n</li>\n<li>\n<p><a href="#testing--post-submit-phase">Testing (or) post-submit phase</a>:</p>\n<ul>\n<li>Add ability for crucial scalability jobs to block submit-queue</li>\n</ul>\n</li>\n<li>\n<p><a href="#design--feature-proposal-phase">Design (or) feature proposal phase</a>:</p>\n<ul>\n<li>Add a scalability review process for features/designs as needed</li>\n</ul>\n</li>\n</ul>\n<p>Note that the above ordering is sorted from lighter to heavier weight processes. Further, after each phase, we would evaluate <a href="#goal">our goal</a> for a month and exit (i.e not proceed with further phases) if it has already been met. So with the sorting and exit criteria combined, we’re ensuring that only a minimal but sufficient amount of red-tape is added to the development process.</p>\n<h2>Processes in Detail</h2>\n<h3>Implementation / Pre-submit phase</h3>\n<p>A good design does not always mean a good implementation. Besides, code changes are made that do not necessarily correspond to some feature. So we need checks in place for new code being checked-in to the repo, to ensure system scalability is not harmed. For this purpose, we would add two kinds of pre-submit scalability jobs running performance tests:</p>\n<h4>Optional PR jobs</h4>\n<p>These are scalability jobs that do not automatically run against PRs. They need\nto be manually triggered using a bot command and are expected to be triggered by PR authors or reviewers (or delegated to sig-scalability if needed) if they believe the changes can affect scalability. These would further be of two kinds:</p>\n<ul>\n<li>\n<p>Medium-scale jobs<br>\n(<a href="https://github.com/kubernetes/test-infra/issues/5677">relevant feature request</a>)<br>\nJobs that do not consume too many resources (light on quota-usage), not that high on cost and time and low-risk wrt outages, etc. These can be triggered by ~anybody. The following would be available here (can change over time):</p>\n<ul>\n<li>Kubemark-500 (consumes ~80 vCPUs)</li>\n<li>GCE-100 (consumes ~100 vCPUs)</li>\n</ul>\n</li>\n<li>\n<p>Large-scale jobs<br>\n(<a href="https://github.com/kubernetes/test-infra/issues/5051">relevant feature request</a>)<br>\nJobs that are much heavier wrt resources, time, cost and are high-risk. Their trigger would be access-restricted to a group of few googlers for those reasons. To begin with, the group would consist of key googlers from sig-scalability. Also these jobs need quota-checking before trigger and are to be used sparingly. The following would be available here (can change over time):</p>\n<ul>\n<li>Kubemark-2000 (consumes ~270 vCPUs)</li>\n<li>Kubemark-5000 (consumes ~700 vCPUs)</li>\n<li>GCE-500 (consumes ~520 vCPUs)</li>\n<li>GCE-2000 (consumes ~2030 vCPUs)</li>\n</ul>\n</li>\n</ul>\n<h4>Mandatory pre-merge jobs</h4>\n<p>(<a href="https://github.com/kubernetes/test-infra/issues/4445">relevant feature request</a>)</p>\n<p>These are scalability jobs that would run against the PR at the head of the submit-queue right before merging. Note that they wouldn’t be running by default against each opened PR due to resource, cost and other constraints. Further, these should be fast and healthy enough in order to not hurt our merge rate. If the failure rate of their corresponding post-submit jobs goes >2% (measured over last 1 week), it would lead to a P0 issue needing immediate attention from sig-scalability. If needed, this metric may be modified later to subtract false positives (i.e failures belonging to a regression that has been fixed later). Next, these jobs should also be available and open for the author of a PR to be able to kick them - as they might want to verify a fix in case the pre-merge job failed on their PR. The following would be available here (can change over time):</p>\n<ul>\n<li>Kubemark-500 (time to run: <a href="https://k8s-gubernator.appspot.com/builds/kubernetes-jenkins/logs/ci-kubernetes-kubemark-500-gce?before=10000">~50m</a>, flakiness: <a href="https://k8s-gubernator.appspot.com/builds/kubernetes-jenkins/logs/ci-kubernetes-kubemark-500-gce?before=11251">0%</a> in last 100 runs (as of 15/1/18)</li>\n<li>GCE-100 (time to run: <a href="https://k8s-gubernator.appspot.com/builds/kubernetes-jenkins/logs/ci-kubernetes-e2e-gci-gce-scalability?before=8366">~40m</a>, flakiness: <a href="https://k8s-gubernator.appspot.com/builds/kubernetes-jenkins/logs/ci-kubernetes-e2e-gci-gce-scalability?before=9970">1%</a> in last 100 runs (as of 15/1/18)</li>\n</ul>\n<p>About 60% of scalability regressions are caught by these medium-scale jobs (<a href="https://github.com/kubernetes/community/blob/master/sig-scalability/blogs/scalability-regressions-case-studies.md">source</a>) and having them run as presubmits will greatly help by preventing those from entering.</p>\n<h3>Testing / Post-submit phase</h3>\n<p>This phase constitutes the final layer of protection against regressions before cutting the release. We already have scalability CI jobs in place for this. The spectrum of scale they cover is quite wide, ranging from 100-node to 5000-node clusters (both for kubemark and real clusters). However, what what we need additionally is:</p>\n<p>The ability for crucial scalability jobs to block submit-queue (with manual unblock ability)<br>\n(<a href="https://github.com/kubernetes/kubernetes/issues/53255">relevant feature request</a>)<br>\nLack of the above can result in:</p>\n<ul>\n<li>Unsatisfactory release quality</li>\n<li>Loss of days/weeks of eng productivity</li>\n<li>Missing release schedule</li>\n</ul>\n<p>Those points are explained in greater detail (with e.g of release-1.8) under the feature request. In short, we need the ability to block the submit-queue in case of a failure of our large-scale performance job (we exclude correctness job for now due to flakiness). This block would be manually lifted once the cause of regression is identified, or in the worst case, once active debugging of the issue has been ack’d to have begun. This is to make sure that the queue isn’t blocked until the fix is out and verified by the next run.</p>\n<p>To prevent false positive blocks, we would neglect failed runs which:</p>\n<ul>\n<li>didn’t run the performance e2es (i.e failed during cluster startup, ginkgo pre-setup, etc) </li>\n<li>failed due to the same reason as the previous run (checked manually for now)</li>\n<li>failed due to a known flake form earlier (checked manually for now)</li>\n</ul>\n<p>With that, we should have very few false blocks. To illustrate this, look at the <a href="https://k8s-gubernator.appspot.com/builds/kubernetes-jenkins/logs/ci-kubernetes-e2e-gce-large-performance?before=44">last 20 runs</a> (24-43) of gce-large-performance (as of 15/1/18). We have 6 failed runs, out of which couple of them (31,32) failed due to an <a href="https://github.com/kubernetes/kubernetes/issues/51099">actual regression</a>. Others failed due to <a href="https://github.com/kubernetes/kubernetes/issues/55860">known</a> <a href="https://github.com/kubernetes/kubernetes/issues/60097">flakes</a> that are being worked on. So with false positives removed, we would end up blocking only on actual regressions.</p>\n<h3>Design / Feature proposal phase</h3>\n<p>Every feature proposed for the release would be marked by default by a label <code>needs-scalability-assessment</code> on its tracking issue in the features repo (ref). The label needs to be resolved as a prerequisite for the feature to be approved, which can happen in two ways:</p>\n<ul>\n<li>Feature marked as <code>/scalability-approval-not-needed</code> by some <em>scalability-assessor</em> (discussed below) if it is simple enough or doesn’t pose any considerable scalability implications. We require here that the assessor isn’t closely related to the feature/design - i.e. must not be working on it. This is to ensure an unbiased and fresh perspective of the problem.</li>\n<li>Feature marked as <code>/needs-scalability-review</code> by some <em>scalability-assessor</em> if it is considered to have potential scalability implications. This would result in a <em>scalability-reviewer</em> (discussed below) being assigned (manually or automatically) who would further look into the design at greater detail before giving a YES/NO. This assignment can be changed based on the reviewer’s area of expertise. Here again, we want at least one reviewer not closely related to the feature/design, preferably from a different SIG.</li>\n</ul>\n<p><em>Scalability-assessor</em>: A project member with decent understanding of the whole system and its interactions, but not necessarily at a very great depth, in order to be able to decide if a feature can have scalability implications. Acts as a primary filter before routing to <em>scalability-reviewers</em></p>\n<p><em>Scalability-reviewer</em>: An experienced project member who understands the whole system and its interactions at great depth in order to be able to spot scalability/performance issues coming from diverse aspects of the design. Final authority to decide if the feature is approved from scalability point of view.</p>\n<p>Note:</p>\n<ul>\n<li>If needed later, we may need to extend coverage of this process to designs which are not part of features repo.</li>\n<li>Before this phase, we will let the exit criteria be evaluated for a longer period (one release) instead of the usual one month for other phases, since this is a heavier change.</li>\n</ul>\n<h4>Finding people for those roles</h4>\n<ul>\n<li>For scalability-reviewers, we will initially begin by requesting a small group of experienced project members (TBD) to volunteer for the role. Those who accept would be included. Over time, more members may be added to the group as needed, with consent from the existing members.</li>\n<li>For scalability-assessors, we will begin with the same set of people as the scalability-reviewers. Similar to scalability-reviewers, more members may be added to this group as needed. But the criteria to allow them could be weaker. To begin with, we may just need them to be aware of <a href="https://docs.google.com/document/d/190lWs3SeU4lCnNtscErlCtFgISNlbvDlu5OeISOLKo0/edit#heading=h.ie92xnlbptq2">scalability good practices</a>.</li>\n</ul>\n<h4>Managing workload on those people</h4>\n<ul>\n<li>\n<p>The number of features per release is usually around 30-40. Out of which beta/stable ones are ~10-20 Some historical data:</p>\n<ul>\n<li>For <a href="https://docs.google.com/spreadsheets/d/1IJSTd3MHorwUt8i492GQaKKuAFsZppauT4v1LJ91WHY/edit#gid=0">release-1.7</a>: 28 features (18 (alpha) + 6 (beta) + 4 (stable))</li>\n<li>For <a href="https://docs.google.com/spreadsheets/d/1AFksRDgAt6BGA3OjRNIiO3IyKmA-GU7CXaxbihy48ns/edit#gid=0">release-1.8</a>: 39 features (19 (alpha) + 16 (beta) + 4 (stable))</li>\n<li>For <a href="https://docs.google.com/spreadsheets/d/1WmMJmqLvfIP8ERqgLtkKuE_Q2sVxX8ZrEcNxlVIJnNc/edit#gid=0">release-1.9</a>: 38 features (21 (alpha) + 13 (beta) + 4 (stable))</li>\n</ul>\n</li>\n<li>\n<p>Having around 8 reviewers, each one should have ~5 features to review on an avg. It would be lesser in practice as not all features require scalability review of design. We lack historical data on avg time it would take to review one feature, but we believe that reviewing scalability alongside the normal review shouldn’t add too much overhead. But..</p>\n</li>\n<li>\n<p>If some complex features need more review time, we can load balance others across the remaining reviewers. A reviewer may also delegate his assignment to another reviewer / project member more experienced with the area and/or having better context. This may be done for the purpose of workload distribution as well, if both parties agree.</p>\n</li>\n</ul>\n<h4>Scalability review for alpha features</h4>\n<p>Scalability review for alpha features\nAlpha features are often implemented for experimental purposes, so we offer a bit more flexibility for them in terms of needing a scalability approval. More precisely, an alpha feature:</p>\n<ul>\n<li>would go through scalability review just like other features</li>\n<li>needs to address issues which can affect system scalability, before getting an approval</li>\n<li>may choose to neglect issues which do not affect system performance, if the feature is isolated enough. However to move to beta later, they would need to do so.</li>\n</ul>\n<h2>Conclusion</h2>\n<p>With all the above checks in place, we should be able to secure kubernetes well from scalability/performance issues. Further, we hope that this would help bolster awareness about scalability among developers. And in general create a healthy interest among the community for building top-quality ‘scalable’ features.</p>'},site:{siteMetadata:{sigs:["sig-api-machinery","sig-apps","sig-architecture","sig-auth","sig-autoscaling","sig-aws","sig-azure","sig-big-data","sig-cli","sig-cloud-provider","sig-cluster-lifecycle","sig-cluster-ops","sig-contributor-experience","sig-docs","sig-gcp","sig-ibmcloud","sig-instrumentation","sig-multicluster","sig-network","sig-node","sig-openstack","sig-product-management","sig-release","sig-scalability","sig-scheduling","sig-service-catalog","sig-storage","sig-testing","sig-ui","sig-vmware","sig-windows"]}}},pathContext:{slug:"/sig-scalability/processes/formal-scalability-processes/"}}}});
//# sourceMappingURL=path---sig-scalability-processes-formal-scalability-processes-fd12a36a074630e977bf.js.map