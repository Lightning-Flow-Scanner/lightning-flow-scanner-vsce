<article class="rule-card">
    <h2>
        <slot name="label">
            <span class="missing">Unknown label</span>
        </slot>
    </h2>

    <div class="description">
        <slot name="description">
            <span class="missing">Unknown description</span>
        </slot>
    </div>
    <br>
    <slot name="uri">
        <span class="missing">Unknown location</span>
    </slot>
    <div class="docRefs">
        <slot name="docRefs">
        </slot>
    </div>


</article>
