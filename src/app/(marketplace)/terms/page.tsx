/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Text } from '@0xsequence/design-system';

const VERSION = '2.0';
const LAST_REVISED_ON = 'June 15, 2022';
const WEBSITE_URL = 'https://sequence.market';
const UNSUPPORTED_COUNTRIES_LIST_URL =
  'https://support.sequence.xyz/en/article/sequence-list-of-restricted-regions-1eked2s/';

async function TermsOfUse() {
  return (
    <div className="mx-auto my-12 flex max-w-[1200px] flex-col items-start gap-6 px-6 text-secondary">
      <Text className="text-3xl font-bold text-primary" asChild>
        <h2>Sequence Marketplace User Interface Terms of Use</h2>
      </Text>
      <Text className="text-secondary">Version {VERSION}</Text>
      <Text className="text-secondary">Last revised on: {LAST_REVISED_ON}</Text>
      <br />
      <p className="text-secondary">
        Please review these Terms of Use (&ldquo;
        <strong className="text-primary font-semibold">
          Sequence Marketplace User Interface Terms
        </strong>
        &rdquo;) carefully, as they set forth the legally binding terms and
        conditions that govern your use of our website located at{' '}
        <strong></strong>
        <strong className="text-primary font-semibold">
          <em>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              {WEBSITE_URL}
            </a>
          </em>
        </strong>
        <strong className="text-primary font-semibold"> </strong>(&ldquo;
        <strong className="text-primary font-semibold">Website</strong>&rdquo;)
        including related trademarks, software code, and other intellectual
        property (together, the &ldquo;
        <strong className="text-primary font-semibold">
          Sequence Marketplace Services
        </strong>
        &rdquo;).
      </p>
      <p className="text-secondary">
        By accessing or using the Sequence Marketplace Services, you agree to
        these Sequence Marketplace User Interface Terms on behalf of yourself
        and any entity you represent, and you represent and warrant that you
        have the right and authority to do so. You further represent and warrant
        that you are fully able and competent to enter into, and abide by and
        comply with, the Sequence Marketplace User Interface Terms.
      </p>
      <p className="text-secondary">
        By accessing or using the Sequence Marketplace Services, you represent
        that you are of the legal age of majority in your jurisdiction as may be
        required to access and use the Sequence Marketplace Services.&nbsp;
      </p>
      <p className="text-secondary">
        The Website is a copyrighted work belonging to Horizon Blockchain Games
        Inc. (&ldquo;
        <strong className="text-primary font-semibold">Horizon</strong>,&rdquo;
        &ldquo;
        <strong className="text-primary font-semibold">Company</strong>,&rdquo;
        &ldquo;<strong className="text-primary font-semibold">HBG</strong>
        ,&rdquo; &ldquo;
        <strong className="text-primary font-semibold">us</strong>,&rdquo;
        &ldquo;
        <strong className="text-primary font-semibold">our</strong>,&rdquo; and
        &ldquo;<strong className="text-primary font-semibold">we</strong>
        &rdquo;).&nbsp;
      </p>
      <p className="text-secondary">
        SOME JURISDICTIONS (WHICH MAY INCLUDE QUEBEC, CANADA) DO NOT ALLOW
        MANDATORY ARBITRATION, PROHIBITIONS AGAINST CLASS ACTIONS OR GOVERNING
        LAW AND FORUMS OTHER THAN WHERE THE INDIVIDUAL CONSUMER IS LOCATED. IF
        YOU ARE LOCATED IN ONE OF THESE JURISDICTIONS, THE FOLLOWING SENTENCE
        MAY NOT APPLY TO YOU AND YOU MAY HAVE ADDITIONAL RIGHTS. THESE TERMS
        REQUIRE THE USE OF ARBITRATION, AS SET FORTH IN MORE DETAIL IN SECTION 8
        BELOW, ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY
        TRIALS OR CLASS ACTIONS, AND ALSO LIMIT THE REMEDIES AVAILABLE TO YOU IN
        THE EVENT OF A DISPUTE.
      </p>
      <ol className="list-decimal pl-5">
        <li className="text-primary">
          <strong>Niftyswap.</strong>
        </li>
      </ol>
      <p className="text-muted">
        <strong className="text-primary font-semibold">1.1</strong>{' '}
        <strong className="text-primary font-semibold">
          Niftyswap protocol
        </strong>
        . Niftyswap is a
      </p>
      <p className="text-secondary">
        Niftyswap is a decentralized protocol for swapping collectible virtual
        goods comprised of an audited smart contract developed by HBG and
        deployed by HBG to the various blockchain networks such as Ethereum,
        Polygon, and other Ethereum-compatible blockchains (the &ldquo;
        <strong className="text-primary font-semibold">
          Relevant Blockchains
        </strong>
        &rdquo;). Niftyswap is designed to facilitate swapping of
        blockchain-based collectible virtual goods created through the use of
        smart contracts employing a particular standard known as ERC-1155.
        Niftyswap provides for the creation of liquidity pools, each comprised
        of a particular ERC-1155 standard collectible digital asset paired with
        another ERC-1155 digital asset referred to as an &ldquo;
        <strong className="text-primary font-semibold">
          ERC-1155 Base Currency
        </strong>
        &rdquo;, to establish automated markets from which users can buy and
        sell such assets in peer-to-pool transactions. Niftyswap is comprises
        open-source software including a smart contract (the &ldquo;
        <strong className="text-primary font-semibold">Factory Contract</strong>
        &rdquo;) that allows for the creation of exchange smart contracts (the
        &ldquo;
        <strong className="text-primary font-semibold">
          Niftyswap Exchange Contract(s)
        </strong>
        &rdquo;), each of which are specific to a particular ERC-1155 standard
        digital asset paired with a particular ERC-1155 Base Currency. The
        Niftyswap Exchange Contract handles the logic for exchanging ERC-1155
        assets for a particular ERC-1155 Base Currency. Pricing of ERC-1155
        assets contributed to a Niftyswap liquidity pool is determined using a
        constant product function in which the price of such an asset is a
        function of the amount of ERC-1155 Base Currency held in reserve in the
        liquidity pool and the amount of the ERC-1155 asset held in the
        liquidity pool reserve. HBG developed the Niftyswap protocol and
        deployed the Factory Contract to the Relevant Blockchains. HBG does not
        operate, maintain, or control the Niftyswap protocol &ndash; now that
        the smart contracts comprising the protocol have been deployed, the
        Niftyswap protocol operates autonomously.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">1.2</strong>{' '}
        <strong className="text-primary font-semibold">Website</strong>. HBG
        provides access to the Niftyswap protocol through the Website, which is
        a frontend user interface designed to provide convenient access to the
        open-source software comprising Niftyswap. The open-source software that
        comprises Niftyswap is also accessible directly via the command line
        (&ldquo;
        <strong className="text-primary font-semibold">Direct Access</strong>
        &rdquo;) and may be accessible via other frontend user interfaces that
        may develop in the future. The Website allows a user to read and display
        data associated with blockchain address for which that user controls the
        associated private key and to interact with the Niftyswap protocol by
        generating standardized transaction messages in order to engage in
        transactions, establish a liquidity pool, or contribute liquidity to an
        existing pool. With the necessary technical expertise, it is possible to
        generate transaction messages to interact with Niftyswap via Direct
        Access without use of the Website, and there is no prohibition herein,
        or separate license required or fee payable to HBG in order to do
        so.&nbsp;
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">1.3</strong>{' '}
        <strong className="text-primary font-semibold">
          Connecting a Wallet
        </strong>
        . In order to access the Niftyswap protocol through the Website or
        Direct Access to engage in transactions, a user must first connect a
        wallet (&ldquo;
        <strong className="text-primary font-semibold">Wallet</strong>&rdquo;).
        Users of the Website can connect a Sequence or other Ethereum compatible
        wallet in order to access the Niftyswap protocol and engage in
        transactions or begin providing liquidity or create a new liquidity
        pool.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">1.4</strong>{' '}
        <strong className="text-primary font-semibold">Fees</strong>.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(a)</strong> A royalty
        fee may be imposed with respect to Exchange Contracts at the discretion
        of the ERC-1155 token owner that owns the ERC-1155 token contract
        (&ldquo;
        <strong className="text-primary font-semibold">Royalty Fees</strong>
        &rdquo;). Royalty Fees are a component of the Exchange Contracts and are
        set at the smart contract level with the default fee set at 0% of the
        value of the assets transacted or at the percentage specified by the
        ERC-1155 token contract if it supports ERC-2981. Royalty Fees will be
        stored in the Exchange Contract and can be withdrawn at anytime to the
        Royalty Fee recipient specified by ERC-2981 in the ERC-1155 contract.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(b)</strong> Transactions
        initiated from the Website are subject to an additional fee of 2% that
        is implemented on the front-end rather than at the smart contract level
        (the &ldquo;
        <strong className="text-primary font-semibold">Front-end Fee</strong>
        &rdquo;). HBG collects Front-end Fees.&nbsp;
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(c)</strong> Liquidity
        provider fees are also assessed with respect to each transaction using
        Niftyswap (the &ldquo;
        <strong className="text-primary font-semibold">LP Fee</strong>&rdquo;).
        The LP Fee is a component of the Exchange Contract on its creation and
        is set such that it applies to each transaction involving such Exchange
        Contract. Different liquidity pools may have different LP Fees and users
        can choose the pools they interact with taking such LP Fees into
        account. The LP Fee is not collected by HBG and is instead retained in
        the Exchange Contract and paid out to liquidity providers when they
        withdraw their liquidity from a particular Niftyswap liquidity
        pool.&nbsp;
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(d)</strong> Using the
        Niftyswap protocol deployed to the Relevant Blockchain to engage in
        transactions will require that you pay network fees for processing those
        transactions on the Relevant Blockchain (&ldquo;
        <strong className="text-primary font-semibold">gas fees</strong>
        &rdquo;). You understand that you are solely responsible for the payment
        of any such gas fees associated with transactions you enter into using
        the Niftyswap protocol and that you must ensure, prior to initiating
        such a transaction, that you have sufficient assets in your Wallet cover
        the applicable gas fee and complete any transaction on the Niftyswap
        protocol. HBG has no control over any such transaction or the associated
        gas fee nor does it receive any portion of such gas fee. Such network
        transaction fees may fluctuate over time depending on a variety of
        factors.
      </p>
      <p className="text-secondary">
        Under no circumstances shall HBG incur any liability, of any kind, to
        you arising from or relating to fees charged to you through Niftyswap.
        Although we attempt to provide accurate fee information, any such
        information may vary from the fees actually paid to use Niftyswap and
        interact with the Ethereum blockchain or any other network with which
        Niftyswap is compatible. Pricing information may be higher or lower than
        prices available on platforms providing similar services. HBG may not be
        held liable for, and you hereby forever release HBG from, any losses or
        other liabilities arising from any inaccurate fee information provided
        in connection with any use of Niftyswap.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">1.5</strong>{' '}
        <strong className="text-primary font-semibold">
          Third-Party Protocol
        </strong>
        . Niftyswap is a third-party protocol that is not operated or maintained
        by HBG. Access to this third-party protocol via the Website is provided
        for your convenience only and does not constitute HBG&rsquo;s approval,
        endorsement, or recommendation of such third-party protocol for you. You
        access and use such third-party protocol based on your own evaluation of
        that protocol and at your own risk. You understand that your use of
        Niftyswap is not governed by these Terms. If you decide to access
        Niftyswap through the Website (or otherwise), you will solely be
        responsible for reviewing, understanding, and accepting the terms,
        conditions and risks associated with the use of Niftyswap and/or any
        other documentation governing its use. You understand that when you use
        the Sequence Marketplace Services to access Niftyswap that you are at no
        time transferring your assets to us and that Horizon will never be in
        control of assets maintained in the Wallet you use to connect to
        Niftyswap. We expressly disclaim all responsibility and liability in
        connection with your use of Niftyswap or any other third-party protocol
        or service you access using the Website. Our Privacy Policy does not
        apply to your use of Niftyswap or any other third-party protocol or
        service. Your use of a third-party protocol or service is subject to the
        terms of use and privacy policies applicable to such protocol or
        service, if any.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">1.6</strong>{' '}
        <strong className="text-primary font-semibold">
          Other Disclaimers.{' '}
        </strong>
        HBG does not operate a digital asset exchange platform or offer trade
        execution or clearing services and, therefore, has no oversight,
        involvement, or control concerning your transactions using the Sequence
        Marketplace Services. All transactions involving users of Sequence
        Marketplace Services are executed peer-to-pool directly through the
        users' Relevant Blockchain network addresses interacting with
        third-party smart contracts. You are responsible for complying with all
        laws that may be applicable to or govern your use of the Sequence
        Marketplace Services
      </p>
      <p className="text-secondary">
        You understand that HBG is not registered or licensed by the Ontario
        Securities Commission, Commodity Futures Trading Commission (&ldquo;
        <strong className="text-primary font-semibold">CFTC</strong>&rdquo;),
        Securities and Exchange Commission&nbsp;(&ldquo;
        <strong className="text-primary font-semibold">SEC</strong>
        &rdquo;) or any financial regulatory authority in Canada, the United
        States or any other jurisdiction. No financial regulatory authority has
        reviewed or approved the use of the Sequence Marketplace Services. The
        Sequence Marketplace Services do not constitute advice or a
        recommendation concerning any commodity, security, or other digital
        asset or instrument. HBG is not acting as an investment adviser or
        commodity trading adviser to any person or entity. HBG does not make any
        representations or warranties as to the functionality of the any
        Relevant Blockchain, or that any Relevant Blockchain will operate free
        from interruptions, delays, defects and/or errors that may delay, hinder
        or prevent the transmission of transactions or messages to or on such
        Relevant Blockchain, or any other blockchain network. The Sequence
        Marketplace Services rely on emerging technologies, such as the Ethereum
        network, or other networks.&nbsp;
      </p>
      <ol className="list-decimal pl-5" start={2}>
        <li className="text-primary">
          <strong>Representations.&nbsp;</strong>
        </li>
      </ol>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">2.1</strong> You make the
        following representations regarding your use of the Sequence Marketplace
        Services:
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(a)</strong> You
        represent and warrant that you are legally permitted to use the Sequence
        Marketplace Services in your jurisdiction including controlling digital
        assets and interacting with the Sequence Marketplace Services in any
        way. You further represent you are responsible for ensuring compliance
        with the laws of your jurisdiction and acknowledge that Horizon is not
        liable for your compliance or non-compliance with such laws.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(b)</strong> You
        represent and warrant that you are not a person or entity identified on:
        (i) a list established under section 83.05 of the Criminal Code
        (Canada), any Regulations made under the United Nations Act (Canada),
        the Freezing Assets of Corrupt Foreign Officials Act (Canada), the
        Justice for Victims of Corrupt Foreign Officials Act (Canada), the
        Special Economic Measures Act (Canada) or any other Canadian statutes or
        regulations that take legislative measures against terrorist financing
        and against financial dealings with certain sanctioned individuals and
        entities; (ii) a list of specially designated national and/or blocked
        persons maintained by the Office of Foreign Assets Control of the United
        States Treasury Department; (iii) a list of denied persons or parties of
        concern maintained by the Bureau of Industry and Security of the United
        States Department of Commerce; or (iv) any similar list promulgated by
        an official agency, ministry or department of the United States.&nbsp;
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(c)</strong> You
        represent and warrant that you are not a resident of, or located in, any
        of the countries listed{' '}
        <a
          href={UNSUPPORTED_COUNTRIES_LIST_URL}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          here
        </a>{' '}
        to which Canada, the United States or other authorities have applied
        legal restrictions or sanctions (a &ldquo;
        <strong className="text-primary font-semibold">
          Prohibited Jurisdiction
        </strong>
        &rdquo;).{' '}
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(d)</strong> You
        represent that you will not disrupt, interfere with, or otherwise
        adversely affect the normal flow of the Sequence Marketplace Services or
        otherwise act in a manner that may negatively affect other users'
        experience when using the Sequence Marketplace Services. This includes
        taking advantage of errors and any other act that intentionally abuses
        or goes against the design of the Sequence Marketplace Services.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(e) </strong>You
        represent and warrant that you are sophisticated in using and evaluating
        blockchain technologies and related blockchain-based digital assets,
        including but not limited to the Ethereum network, smart contract
        systems, and automated market making protocols. Specifically, you
        represent and warrant that you have evaluated and understand the
        operation of, and the risks associated with, the Website and the
        Niftyswap Protocol and have not relied on any information, statement,
        representation, or warranty, express or implied, made by or on behalf of
        HBG with respect to the Niftyswap Protocol.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(f) </strong>You
        represent and warrant that you have read and understood the risks
        associated with accessing and using the Niftyswap protocol via the
        Website as set forth herein.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(g) </strong>All of the
        above representations and warranties are true, complete, accurate and
        not misleading from the time of your acceptance of the Sequence
        Marketplace User Interface Terms and are deemed repeated each time you
        use the Site.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(h) </strong>We welcome
        feedback, comments, ideas, and suggestions for improvements to the
        Sequence Marketplace Services ("
        <strong className="text-primary font-semibold">Feedback</strong>"). You
        grant to us a non-exclusive, worldwide, perpetual, irrevocable,
        fully-paid, royalty-free, sublicensable and transferable license under
        any and all intellectual property rights that you own or control to use,
        copy, modify, create derivative works based upon or improvements with
        respect to and otherwise exploit and commercialize the Feedback and any
        such derivative works and improvements in any manner and for any
        purpose.
      </p>
      <p className="text-secondary">
        Horizon reserves the right to determine what conduct it considers to be
        a breach of these representations. Horizon reserves the right to take
        action as a result, which may include prohibiting you from accessing
        services provided by Horizon, in whole or in part. Any restrictions
        imposed by Horizon will not affect your ability to transfer your digital
        assets.&nbsp;
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">2.2</strong> You
        acknowledge and accept the following risks associated with digital
        assets and the use of decentralized smart contract protocols, such as
        the Niftyswap protocol accessible via the Website:
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(a)</strong>&nbsp;HBG is
        not a party to any transaction that takes place on the Niftyswap
        protocol and is not responsible for any such transaction. You are
        responsible for transactions you enter into on the Niftyswap protocol.
        You understand that the smart contracts that comprise the Niftyswap
        protocol may have vulnerabilities subject to exploitation and that the
        underlying code may not be free from bugs or other errors. You
        understand that you are responsible for reviewing and understanding the
        smart contract code before accessing and using the Niftyswap protocol
        via the Website and that if you do not have the expertise necessary to
        do so that you should engage professionals to assist you with same.{' '}
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(b)</strong>&nbsp;You are
        solely responsible for securing the private key(s) or other login
        credentials associated with the Wallet you use to access Sequence
        Marketplaces. You understand that anyone who obtains your private keys
        or login credentials may access your Wallet with or without your
        authorization and may transfer any digital assets accessible through
        your Wallet.&nbsp;
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(c)</strong>&nbsp;The
        value of any digital asset, where value is attached to such an asset,
        may fluctuate. Horizon makes no guarantees as to the price or value of
        any digital asset on the Niftyswap protocol or any other third-party
        market. You acknowledge and accept the risk that your digital assets, or
        any digital assets you acquire may lose some or all of their value and
        you may suffer loss due to the fluctuation of prices of tokens and/or
        significant price slippage and cost.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(d)</strong>&nbsp;The
        following risks are associated with using digital assets: the risk of
        losing private keys, theft resulting from third-parties discovering your
        private key, value fluctuation on the secondary market, disruptions to
        the Relevant Blockchain caused by network congestion, lack of usability
        of the assets due to a hard fork or other disruption to the Relevant
        Blockchain, or errors or vulnerabilities in the smart contract code
        associated with a given digital asset or transactions involving digital
        assets. Transfers on blockchain networks are irreversible. Once an
        instruction, signed by the required private key(s), to transfer a
        digital asset from one blockchain address to another has been executed
        it cannot be undone.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(e)</strong>&nbsp;In the
        event of a change to an underlying blockchain network, or other network
        disruption, resulting in a fork of the blockchain into one (or more)
        additional blockchains, transactions on the blockchain may be disrupted,
        including transactions involving the Niftyswap protocol.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(f)</strong> Polygon is a
        sidechain of Ethereum, meaning it runs in parallel to Ethereum and
        provides a two way bridge enabling users to bring Ethereum-based assets
        on to Polygon from Ethereum and vice-versa. Because Polygon and similar
        blockchains are their own separate blockchains, the security of such
        blockchains is independent from the security of Ethereum. The
        instantiation of Polygon on which the Niftyswap protocol is deployed
        utilizes a consensus mechanism with a limited number of validators. On a
        network with concentrated validators there is a greater risk that
        participants may collude and make arbitrary changes, which, among other
        things, might potentially result in users being blocked from porting
        assets on Polygon back to Ethereum. Similar risks are associated with
        other sidechain blockchains to which the Niftyswap protocol may be
        deployed.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(g)</strong> The
        Niftyswap protocol allows participants to engage in a variety of
        activities which include buying digital assets from Niftyswap liquidity
        pools, creating new liquidity pools, and contributing liquidity to
        liquidity pools. Users of the Niftyswap protocol bear the risks of
        interacting with the Niftyswap protocol when they participate in these
        activities. Because these activities are occurring through a
        decentralized protocol, users understand that there are no licensed
        intermediaries involved in these activities and that they may have
        limited recourse in the event that they lose value when interacting with
        the Niftyswap protocol.{' '}
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(h)</strong> You are
        solely responsible for determining the tax implications and tax
        reporting requirements associated with transactions you engage in by
        accessing Niftyswap via the Website and for paying any applicable taxes.
        Horizon is not responsible for determining whether there are tax
        implications in connection with such transactions, for reporting any
        such transactions, or for paying any applicable taxes.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(i)</strong>&nbsp;Horizon
        may modify or discontinue support for the Website at any time. Horizon
        reserves the right, at any time and without notice, in our sole and
        absolute discretion, to modify the Website.
      </p>
      <ol className="list-decimal pl-5" start={3}>
        <li className="text-primary">
          <strong>Website Terms</strong>
        </li>
      </ol>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">3.1</strong>{' '}
        <strong className="text-primary font-semibold">
          Access to the Website
        </strong>
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(a)</strong>{' '}
        <strong className="text-primary font-semibold">License. </strong>
        &nbsp;Subject to these Sequence Marketplace User Interface Terms,
        Horizon grants you a non-transferable, non-exclusive, revocable, limited
        license to use and access the Website for your own personal and
        non-commercial use.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(b)</strong>{' '}
        <strong className="text-primary font-semibold">
          Certain Restrictions.{' '}
        </strong>
        The rights granted to you in these Sequence Marketplace User Interface
        Terms are subject to the following restrictions: (a) you shall not
        license, sell, rent, lease, transfer, assign, distribute, host, or
        otherwise commercially exploit the Website, whether in whole or in part,
        or any content displayed on the Website; (b) you shall not (directly or
        indirectly) modify, decipher, disassemble, reverse compile or reverse
        engineer or otherwise attempt to derive any source code or underlying
        ideas or algorithms of any part of the Sequence Marketplace Services;
        (c) you shall not access the Website in order to build a similar or
        competitive website, product, or service; (d) you shall not translate,
        or otherwise create derivative works, adaptations, translations or
        compilations of any part of the Sequence Marketplace Services; (e) you
        shall not rent, lease, distribute, or otherwise transfer any of the
        rights that you receive hereunder; (f) you shall not frame or mirror any
        part of the Website without Horizon&rsquo;s express prior written
        consent; (g) you shall not create a database by systematically
        downloading and storing content related to the Sequence Marketplace
        Services; (h) you shall not use any robot, spider, site search/retrieval
        application or other manual or automatic device to retrieve, harvest,
        index, &ldquo;scrape,&rdquo; &ldquo;data mine&rdquo; or in any way
        gather content related to the Sequence Marketplace Services or reproduce
        or circumvent the navigational structure or presentation of the Sequence
        Marketplace Services without Horizon&rsquo;s express prior written
        consent; and (i) except as expressly stated herein, no part of the
        Website may be copied, reproduced, distributed, republished, downloaded,
        displayed, posted or transmitted in any form or by any means. Unless
        otherwise indicated, any future release, update, or other addition to
        functionality of the Website shall be subject to these Sequence
        Marketplace User Interface Terms. All copyright and other proprietary
        notices on the Website (or on any content displayed on the Website) must
        be retained on all copies thereof.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(c)</strong>{' '}
        <strong className="text-primary font-semibold">
          Modification of the Website.
        </strong>{' '}
        Horizon reserves the right, at any time, to modify, suspend, or
        discontinue the Website (in whole or in part) with or without notice to
        you. You agree that Horizon will not be liable to you or to any third
        party for any modification, suspension, or discontinuation of the
        Websites or any part thereof.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(d)</strong>{' '}
        <strong className="text-primary font-semibold">
          No Support or Maintenance.
        </strong>{' '}
        You acknowledge and agree that Horizon will have no obligation to
        provide you with any support or maintenance in connection with the
        Website, unless specifically contracted for under a separate agreement.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">(e)</strong>{' '}
        <strong className="text-primary font-semibold">Ownership. </strong>
        Excluding any User Content that you may provide, you acknowledge that
        all the intellectual property rights, including copyrights, patents,
        trademarks, and trade secrets, in the Website and their content are
        owned by Horizon. Neither these Sequence Marketplace User Interface
        Terms nor your access to the Website transfers to you or any third party
        any rights, title or interest in or to such intellectual property
        rights, except for the limited access rights expressly set forth in
        these Sequence Marketplace User Interface Terms. Horizon reserves all
        rights not granted in these Sequence Marketplace User Interface Terms.
        There are no implied licenses granted under these Sequence Marketplace
        User Interface Terms.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">3.2</strong>{' '}
        <strong className="text-primary font-semibold">
          Accuracy of Information.{' '}
        </strong>
        &nbsp;We attempt to ensure that the information that we provide on the
        Website is complete, accurate and current. Despite our efforts, the
        information on the Website may occasionally be inaccurate, incomplete or
        out of date. We make no representation as to the completeness, accuracy
        or correctness of any information on any Website.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">3.3</strong>{' '}
        <strong className="text-primary font-semibold">
          Links to Third Party Websites
        </strong>
        . The Website may now or in the future contain links to third party
        websites. Where provided, these links are provided as a convenience to
        you. Horizon does not control and is not responsible for the content of
        such third-party websites or the conduct of the operators of such
        third-party websites, and we do not make any representations regarding
        the accuracy, copyright, or other statutory or regulatory compliance,
        legality, or decency of any of the content or other materials on such
        third-party websites. If you decide to access linked third-party
        websites, you do so at your own risk.&nbsp;
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">3.4</strong>{' '}
        <strong className="text-primary font-semibold">
          Access to Protocol
        </strong>
        . The Website allows users to access the Niftyswap protocol. As
        described above, the Niftyswap protocol is comprised of smart contracts
        deployed to the Relevant Blockchain. Horizon does not have control over
        these smart contracts or the operation of the Niftyswap protocol. If you
        use the Website to access the Niftyswap protocol you should conduct your
        own evaluation of the protocol to ensure you understand how it works.
        You access the Niftyswap protocol at your own risk.
      </p>
      <ol className="list-decimal pl-5" start={4}>
        <li className="text-primary">
          <strong>Disclaimers</strong>
        </li>
      </ol>
      <p className="text-secondary">
        SOME JURISDICTIONS (WHICH MAY INCLUDE QUEBEC) DO NOT ALLOW THE EXCLUSION
        OR LIMITATION OF LIABILITY, INCLUDING LIMITATION OF LIABILITY FOR
        CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE FOLLOWING LIMITATION MAY NOT
        APPLY TO YOU AND YOU MAY HAVE ADDITIONAL RIGHTS.
      </p>
      <p className="text-secondary">
        THE SEQUENCE MARKETPLACE SERVICES ARE PROVIDED ON AN &ldquo;AS-IS&rdquo;
        AND &ldquo;AS AVAILABLE&rdquo; BASIS, AND HORIZON (AND OUR SUPPLIERS)
        EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS OF ANY KIND,
        WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES OR
        CONDITIONS OF MERCHANTABILITY, MERCHANTABLE QUALITY, FITNESS FOR A
        PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR
        NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT THE SEQUENCE MARKETPLACE
        SERVICES WILL MEET YOUR REQUIREMENTS, WILL BE AVAILABLE ON AN
        UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE,
        RELIABLE, FREE OF VIRUSES OR OTHER HARMFUL CODE, COMPLETE, LEGAL, OR
        SAFE. IF APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT TO THE
        SEQUENCE MARKETPLACE SERVICES, ALL SUCH WARRANTIES ARE LIMITED IN
        DURATION TO NINETY (90) DAYS FROM THE DATE OF FIRST USE.
      </p>
      <p className="text-secondary">
        HORIZON DOES NOT ENDORSE ANY OTHER THIRD PARTY AND SHALL NOT BE
        RESPONSIBLE IN ANY WAY FOR ANY TRANSACTIONS YOU ENTER INTO WITH OTHER
        USERS OF THE NIFTYSWAP PROTOCOL. YOU AGREE THAT HORIZON WILL NOT BE
        LIABLE FOR ANY LOSS OR DAMAGES OF ANY SORT INCURRED AS THE RESULT OF ANY
        INTERACTIONS BETWEEN YOU AND OTHER USERS OF THE NIFTYSWAP PROTOCOL.
      </p>
      <ol className="list-decimal pl-5" start={5}>
        <li className="text-primary">
          <strong>Term and Termination&nbsp;</strong>
        </li>
      </ol>
      <p className="text-secondary">
        These Sequence Marketplace User Interface Terms will remain in full
        force and effect while you use the Sequence Marketplace Services. We may
        suspend or terminate your rights to use the Sequence Marketplace
        Services at any time for any reason at our sole discretion, including
        for any use of the Sequence Marketplace Services in violation of these
        Sequence Marketplace User Interface Terms. Upon termination of your
        rights under these Sequence Marketplace User Interface Terms, your right
        to access and use the Sequence Marketplace Services will terminate
        immediately. You understand that any termination of your rights may
        involve removal of your User Content from our live databases. Horizon
        will not have any liability whatsoever to you for any termination of
        your rights under these Sequence Marketplace User Interface Terms,
        including for deleting your account or blacklisting any network address
        you provide to us. Even after your rights under these Sequence
        Marketplace User Interface Terms are terminated, the following
        provisions of these Sequence Marketplace User Interface Terms will
        remain in effect: Section 4, Section 6, Section 7, Section 8, and
        Section 11.
      </p>
      <ol className="list-decimal pl-5" start={6}>
        <li className="text-primary">
          <strong>Indemnification</strong>
        </li>
      </ol>
      <p className="text-secondary">
        You agree to indemnify and hold Horizon (and its officers, employees,
        and agents) harmless, including costs and attorneys&rsquo; fees, from
        any claim or demand made by any third party due to or arising out of:
        (i) your use of the Sequence Marketplace Services; (ii) your violation
        of these Sequence Marketplace User Interface Terms; (iii) your violation
        of applicable laws or regulations; (iv) your User Content; or (v)
        third-party services. Horizon reserves the right, at your expense, to
        assume the exclusive defense and control of any matter for which you are
        required to indemnify us, and you agree to cooperate with our defense of
        these claims. You agree not to settle any matter without the prior
        written consent of Horizon. Horizon will use reasonable efforts to
        notify you of any such claim, action or proceeding upon becoming aware
        of it.
      </p>
      <ol className="list-decimal pl-5" start={7}>
        <li className="text-primary">
          <strong>Limitation on Liability</strong>
        </li>
      </ol>
      <p className="text-secondary">
        SOME JURISDICTIONS (WHICH MAY INCLUDE QUEBEC, CANADA) DO NOT ALLOW THE
        EXCLUSION OR LIMITATION OF LIABILITY, INCLUDING LIMITATION OF LIABILITY
        FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE FOLLOWING LIMITATION MAY
        NOT APPLY TO YOU AND YOU MAY HAVE ADDITIONAL RIGHTS.
      </p>
      <p className="text-secondary">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL HORIZON BE
        LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, OR ANY
        INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE
        DAMAGES ARISING OUT OF YOUR USE OF THE SEQUENCE MARKETPLAEC SERVICES,
        EVEN IF HORIZON HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        ACCESS TO, AND USE OF, THE SEQUENCE MARKETPLAEC SERVICES IS AT YOUR OWN
        DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE
        TO YOUR DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.
        HORIZON SHALL NOT BE LIABLE UNDER ANY CIRCUMSTANCES FOR DAMAGES ARISING
        OUT OF OR IN ANY WAY RELATED TO SOFTWARE, PRODUCTS, SERVICES, AND/OR
        INFORMATION OFFERED OR PROVIDED BY THIRD-PARTIES AND ACCESSED THROUGH
        THE SEQUENCE MARKETPLAEC SERVICES.
      </p>
      <p className="text-secondary">
        HORIZON SHALL NOT BE LIABLE FOR ANY LOSS OR DAMAGE ARISING OUT OF YOUR
        FAILURE TO KEEP YOUR PRIVATE KEYS OR LOGIN CREDENTIALS TO YOUR WALLET
        SECURE OR ANY OTHER UNAUTHORIZED ACCESS TO OR TRANSACTIONS INVOLVING
        YOUR WALLET.
      </p>
      <p className="text-secondary">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE
        CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY DAMAGES ARISING
        FROM OR RELATED TO THIS AGREEMENT (FOR ANY CAUSE WHATSOEVER AND
        REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO A
        MAXIMUM OF FIFTY US DOLLARS (U.S. $50). THE EXISTENCE OF MORE THAN ONE
        CLAIM WILL NOT ENLARGE THIS LIMIT.&nbsp;
      </p>
      <ol className="list-decimal pl-5" start={8}>
        <li className="text-primary">
          <strong>Dispute Resolution</strong>
        </li>
      </ol>
      <p className="text-secondary">
        Please read this section carefully. It is part of your contract with
        Horizon and affects your rights. You and Horizon are each considered
        &ldquo;<strong className="text-primary font-semibold">Parties</strong>
        &rdquo; for the purpose of this section. SOME JURISDICTIONS (WHICH MAY
        INCLUDE QUEBEC, CANADA) DO NOT ALLOW MANDATORY ARBITRATION, PROHIBITIONS
        AGAINST CLASS ACTIONS OR GOVERNING LAW AND FORUMS OTHER THAN WHERE THE
        CONSUMER IS LOCATED. IF YOU ARE LOCATED IN ONE OF THESE JURISDICTIONS,
        THE FOLLOWING MAY NOT APPLY TO YOU AND YOU MAY HAVE ADDITIONAL RIGHTS.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">8.1</strong>{' '}
        <strong className="text-primary font-semibold">Mediation. </strong>If
        any dispute occurs between the Parties relating to the application,
        interpretation, implementation or validity of these Sequence Marketplace
        User Interface Terms, the Parties agree to seek to resolve the dispute
        or controversy through mediation with Canadian Arbitration Association
        before pursuing any other proceedings. Nothing herein shall preclude any
        Party from seeking injunctive relief in the event that the Party
        perceives that without such injunctive relief, serious harm may be done
        to the Party. Any Party to the dispute may serve notice on the others of
        its desire to resolve a particular dispute by mediation. The mediator
        shall be appointed by agreement between the Parties or, if the Parties
        cannot agree within five days after receipt of the notice of intention
        to mediate, the mediator will be appointed by Canadian Arbitration
        Association. The mediation will be held at Toronto, Ontario, Canada. The
        Parties agree to attempt to resolve their dispute at mediation. The
        costs of the mediator shall be shared equally by the Parties. If the
        dispute has not been resolved within thirty days of the notice of desire
        to mediate, any Party may terminate the mediation and proceed to
        arbitration as set out below.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">8.2</strong>{' '}
        <strong className="text-primary font-semibold">Arbitration. </strong>
        Subject to the mediation provisions set out above, if any dispute or
        controversy occurs between the Parties relating to the interpretation or
        implementation of any of the provisions of this Agreement, the dispute
        will be resolved by arbitration at Canadian Arbitration Association
        pursuant to the general Canadian Arbitration Association Rules for
        Arbitration. Any Party may serve notice of its desire to refer a dispute
        to arbitration. The arbitration shall be conducted by a single
        arbitrator. The arbitration shall be held in Toronto, Ontario, Canada.
        The arbitration shall proceed in accordance with the provisions of the
        Arbitration Act (Ontario). The decision arrived at by the arbitrator
        shall be final and binding and no appeal shall lie therefrom. Judgement
        upon the award rendered by the arbitrator may be entered in any court
        having jurisdiction. The costs of the arbitrator shall be divided
        equally between the Parties.
      </p>
      <ol className="list-decimal pl-5" start={9}>
        <li className="text-primary">
          <strong>Disclosures.</strong>
        </li>
      </ol>
      <p className="text-secondary">
        Horizon is located in Ontario, Canada. If you are a California resident,
        you may report complaints to the Complaint Assistance Unit of the
        Division of Consumer Product of the California Department of Consumer
        Affairs by contacting them in writing at 400 R Street, Sacramento, CA
        95814, or by telephone at (800) 952-5210.
      </p>
      <ol className="list-decimal pl-5" start={10}>
        <li className="text-primary">
          <strong>Electronic Communications.&nbsp;</strong>
        </li>
      </ol>
      <p className="text-secondary">
        The communications between you and Horizon use electronic means, whether
        you use the Sequence Marketplace Services or send us emails, or whether
        Horizon posts notices on the Sequence Marketplace Services or
        communicates with you via email. For contractual purposes, you: (i)
        consent to receive communications from Horizon in an electronic form;
        and (ii) agree that all terms and conditions, agreements, notices,
        disclosures, and other communications that Horizon provides to you
        electronically satisfy any legal requirement that such communications
        would satisfy if it were be in a hardcopy writing. The foregoing does
        not affect your non-waivable rights.
      </p>
      <ol className="list-decimal pl-5" start={11}>
        <li className="text-primary">
          <strong>Governing Law and Jurisdiction</strong>
        </li>
      </ol>
      <p className="text-secondary">
        SOME JURISDICTIONS HAVE CONSUMER PROTECTION AND OTHER LEGISLATION WHICH
        MAY APPLY TO THE SERVICES AND WHICH DO NOT ALLOW CERTAIN PROVISIONS SUCH
        AS RESTRICTIONS ON GOVERNING LAW OR JURISDICTION, LIMITATIONS OF
        LIABILITY AND EXCLUSION OF CERTAIN WARRANTIES, AMONG OTHERS. TO THE
        EXTENT THAT A RESTRICTION ON GOVERNING LAW OR JURISDICTION, LIMITATION,
        EXCLUSION, RESTRICTION OR OTHER PROVISION SET OUT BELOW IS SPECIFICALLY
        PROHIBITED BY APPLICABLE LAW, SUCH LIMITATION, EXCLUSION, RESTRICTION OR
        PROVISION MAY NOT APPLY TO YOU.
      </p>
      <p className="text-secondary">
        These Sequence Marketplace User Interface Terms and any dispute or claim
        arising out of or in connection with their subject matter or formation
        (including non-contractual disputes or claims) shall be governed by and
        construed in accordance with the law of Ontario. You agree that the
        courts of Ontario shall have exclusive jurisdiction to settle any
        dispute or claim arising out of or in connection with the subject matter
        or formation (including non-contractual disputes or claims) of these
        Sequence Marketplace User Interface Terms.
      </p>
      <p className="text-secondary">
        If you are located outside of the United States or Canada, you use or
        access the Sequence Marketplace Services solely at your own risk. The
        Sequence Marketplace Services may not be appropriate or available for
        use in some jurisdictions. Horizon and its partners do not represent or
        warrant that the Sequence Marketplace Services or any part thereof is
        appropriate or available for use in any particular jurisdiction other
        than the United States or Canada. In choosing to access the Sequence
        Marketplace Services, you do so on your own initiative and at your own
        risk, and you are responsible for complying with all local laws, rules
        and regulations.
      </p>
      <ol className="list-decimal pl-5" start={12}>
        <li className="text-primary">
          <strong>General</strong>
        </li>
      </ol>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">12.1</strong>{' '}
        <strong className="text-primary font-semibold">Entire Terms.</strong>{' '}
        These Sequence Marketplace User Interface Terms constitute the entire
        agreement between you and us regarding the use of the Sequence
        Marketplace Services. The section titles in these Sequence Marketplace
        User Interface Terms are for convenience only and have no legal or
        contractual effect. The word &ldquo;including&rdquo; means
        &ldquo;including without limitation.&rdquo; If any provision of these
        Sequence Marketplace User Interface Terms is, for any reason, held to be
        invalid or unenforceable, the other provisions of these Sequence
        Marketplace User Interface Terms will be unimpaired and the invalid or
        unenforceable provision will be deemed modified so that it is valid and
        enforceable to the maximum extent permitted by law. You confirm that you
        are acting on your own behalf and not for the benefit of any other
        person. Your relationship to Horizon is that of an independent
        contractor, and neither party is an agent or partner of the other. These
        Sequence Marketplace User Interface Terms, and your rights and
        obligations herein, may not be assigned, subcontracted, delegated, or
        otherwise transferred by you without Horizon&rsquo;s prior written
        consent, and any attempted assignment, subcontract, delegation, or
        transfer in violation of the foregoing will be null and void. Horizon
        may freely assign these Sequence Marketplace User Interface Terms. The
        terms and conditions set forth in these Sequence Marketplace User
        Interface Terms shall be binding upon assignees.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">12.2</strong>{' '}
        <strong className="text-primary font-semibold">Changes.</strong> Unless
        otherwise required by applicable laws, which may include the laws of
        Quebec, Canada, if applicable (in which case, we will make changes in
        accordance with such laws), these Terms are subject to occasional
        revision. If we make any substantial changes, you will be prompted to
        review those changes and click to accept the updated Terms when you next
        log in to your Account. These changes will be effective upon your
        acceptance of the updated Terms. In addition, continued use of our
        Services following notice of such changes shall indicate your
        acknowledgement of such changes and agreement to be bound by the terms
        and conditions of such changes.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">12.3</strong>{' '}
        <strong className="text-primary font-semibold">Waiver.</strong> A waiver
        by Horizon of any right or remedy under these Sequence Marketplace User
        Interface Terms shall only be effective if it is in writing, executed by
        a duly authorized representative of Horizon and shall apply only to the
        circumstances for which it is given. Our failure to exercise or enforce
        any right or remedy under these Sequence Marketplace User Interface
        Terms shall not operate as a waiver of such right or remedy, nor shall
        it prevent any future exercise or enforcement of such right or remedy.
        No single or partial exercise of any right or remedy shall preclude or
        restrict the further exercise of any such right or remedy or other
        rights or remedies.
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">12.4</strong>{' '}
        <strong className="text-primary font-semibold">
          Copyright and Trademark Information.
        </strong>{' '}
        Copyright &copy; 2022 Horizon Blockchain Games Inc. All rights reserved.
        All trademarks, logos and service marks (&ldquo;
        <strong className="text-primary font-semibold">Marks</strong>&rdquo;)
        displayed on the Sequence Marketplace Services are our property or the
        property of other third parties. You are not permitted to use these
        Marks without our prior written consent or the consent of such third
        party which may own the Marks.{' '}
      </p>
      <p className="text-secondary">
        <strong className="text-primary font-semibold">12.5</strong>{' '}
        <strong className="text-primary font-semibold">
          Contact Information.{' '}
        </strong>
        You may contact us at any time regarding these Sequence Marketplace User
        Interface Terms at{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="mailto:hello@horizongames.net"
          className="text-primary underline"
        >
          hello@horizongames.net
        </a>
        .
      </p>{' '}
    </div>
  );
}

export default TermsOfUse;

export const runtime = 'edge';
