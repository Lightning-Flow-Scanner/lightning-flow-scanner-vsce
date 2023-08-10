<style>

    .rule-card {
    border-radius: 2px;
    display: block;
    margin: 12px;
    }

    .missing {
    color: #999;
    }

    .description{
        font-style: italic;
        margin: 3px;
    }

    .label{
        font-weight: bolder;
    }

</style>

<article class="rule-card">
    <h4>
        <div class="label">
            <slot name="label">
                <span class="missing">Unknown label</span>
            </slot>
            (<slot name="config">
                <span class="missing">Unknown Id</span>
            </slot>)
        </div>
    </h4>
    <div class="description">
        <p>
            <slot name="description">
                <span class="missing">Unknown description</span>
            </slot>
        </p>
    </div>

    <!-- 
        <div class="docRefs">
        <slot name="docRefs">
        </slot>
    </div> 
-->


</article>
